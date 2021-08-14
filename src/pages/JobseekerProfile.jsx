import React, { useEffect, useState } from "react";
import JobseekerAboutBox from "../layouts/ResumeInfos/JobseekerAboutBox";
import JobseekerExperienceBox from "../layouts/ResumeInfos/JobseekerExperienceBox";
import JobseekerEducationBox from "../layouts/ResumeInfos/JobseekerEducationBox";
import JobseekerSkillBox from "../layouts/ResumeInfos/JobseekerSkillBox";
import JobseekerLanguageBox from "../layouts/ResumeInfos/JobseekerLanguageBox";
import { useSelector } from "react-redux";
import JobseekerService from "../services/jobseekerService";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ResumeService from "../services/resumeService";
import JobseekerApplicationBox from "../layouts/ResumeInfos/JobseekerApplicationBox";
import { toast } from "react-toastify";

export default function JobseekerProfile() {
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const location = {
    pathname: "/upload",
    state: { userId: authItem[0].user.id, token: token },
  };
  const [resume, setResume] = useState({
    id: 0,
    abouts: [],
    educations: [],
    experiences: [],
    skills: [],
    languages: [],
    images: [{imageUrl:"",imageType:0}],
  });
  console.log(resume);
  let [jobseeker, setJobseeker] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    jobTitle: "",
  });

  let jobseekerService = new JobseekerService();
  let resumeService = new ResumeService();
  const history = useHistory();

  async function getJobseekerInfo() {
    try {
      const response = await jobseekerService.getJobseekerInfoById(
        authItem[0].user.id,
        authItem[0].user.token
      );
      console.log(response.data.data)
      setJobseeker(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }

  }
  async function getResume() {
    try {
      const response = await resumeService.getResumeByJobseekerId(
        authItem[0].user.id,
        authItem[0].user.token
      );
      setResume(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getJobseekerInfo();
    getResume();
  }, [authItem]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "50vw",
          height: "100%",
          border: "1px solid #CCD5AE",
          borderRadius: "5px",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
      >
        {resume.id !== 0 && resume.images[1].imageType===2? (
          <img
            style={{ width: "100%", height: "200px" }}
            src={`${resume.images[1].imageUrl}`}
          />
        ) : resume.id !== 0 && resume.images[0].imageType===2? (
          <img
            style={{ width: "100%", height: "200px" }}
            src={`${resume.images[0].imageUrl}`}
          />
        ):<img
        style={{ width: "100%", height: "200px" }}
        src='https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png'
      />}

        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "row",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {resume.id!==0 && resume.images[0].imageType===1 ? (
              <img
                style={{ marginTop: "-75px", width: "150px", height: "150px" }}
                src={`${resume.images[0].imageUrl}`}
              />
            ) : resume.id!==0 && resume.images[1].imageType===1 ?(
              <img
                style={{ marginTop: "-75px", width: "150px", height: "150px" }}
                src={`${resume.images[1].imageUrl}`}
              />
            ):<img
            style={{ marginTop: "-75px", width: "150px", height: "150px" }}
            src={`https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg`}
          />}

            <h5>
              {jobseeker ? jobseeker.firstName + " " + jobseeker.lastName : ""}
            </h5>
            {jobseeker && jobseeker.jobTitle ? (
              <p>{jobseeker.jobTitle}</p>
            ) : null}
          </div>
          <div
            style={{
              width: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "space-around",
            }}
          >
            {authItem[0].user.userType === 1 && (
              <Button.Group vertical>
                <Button
                  size="mini"
                  icon
                  labelPosition="left"
                  onClick={() => {
                    history.push(location);
                  }}
                >
                  <Icon name="photo" />
                  Upload
                </Button>
                <Button size="mini" icon labelPosition="left">
                  Setting
                  <Icon name="setting" />
                </Button>
              </Button.Group>
            )}
          </div>
        </div>
      </div>
      <JobseekerAboutBox resume={resume} />
      <JobseekerEducationBox resume={resume} />
      <JobseekerExperienceBox resume={resume} />
      <JobseekerSkillBox resume={resume} />
      <JobseekerLanguageBox resume={resume} />
      <JobseekerApplicationBox id={authItem[0].user.id} />
    </div>
  );
}
