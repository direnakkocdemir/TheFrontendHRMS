import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, List, Image, Modal, Icon, Button } from "semantic-ui-react";
import AdvertisementService from "../services/advertisementService";
import ApplicationService from "../services/applicationService";
import ResumeService from "../services/resumeService";

export default function EmployerApplicationControl() {

  //Component's parameter to show the applications
  let { id } = useParams();

  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  // State to keep the applicant's resume
  const [resume, setResume] = useState({
    id: 0,
    abouts: [{ id: 0, about: "" }],
    educations: [],
    experiences: [],
    skills: [],
    languages: [],
    images: [],
  });
  // State to keep the jobseeker's application
  const [jobseekerApplications, setJobseekerApplications] = useState([]);
  // State to keep the advertisement information for this component
  const [ad, setAd] = useState({
    description: "",
    jobTitle: "",
    location: { id: 0, name: "" },
    openPosition: 0,
    workTime: { id: 0, name: "" },
  });
  // State to keep the applicants for this component
  const [applicants, setApplicants] = useState([]);
  // State to open or close the modal
  const [open, setOpen] = useState(false);
  //Service to use the Http requests 
  let applicationService = new ApplicationService();
  let advertisementService = new AdvertisementService();
  let resumeService = new ResumeService();

  // Function to get adcertisement by id
  const getAdvertisement = async (id) => {
    try {
      const response = await advertisementService.getAdvertisementById(
        id,
        token
      );
      setAd(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // Function to get the applicants 
  const getApplicants = async () => {
    try {
      const response = await applicationService.getApplicationByAdvertisementId(
        id,
        token
      );
      console.log(response.data.data)
      setApplicants(response.data.data);
    } catch (err) {

    }
  };

  // Function to get the resume by jobseeker id from the data base
  const getResume = async (jobseekerId) => {
    try {
      const response = await resumeService.getResumeByJobseekerId(
        jobseekerId,
        token
      );
      console.log(response.data.data);
      setResume(response.data.data);
    } catch (err) {

    }
  };
  // Function to get the jobseeker's application by jobseeker id 
  const getJobseekersApplications = async (jobseekerId) => {
    try {
      const response = await applicationService.getApplicationByJobseekerId(
        jobseekerId,
        token
      );
      setJobseekerApplications(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  // hook for taking action to get advertisement and applicants
  // if id change, hook works again 
  useEffect(() => {
    getAdvertisement(id);
    getApplicants();
  }, [id]);
  // Function to open and close the modal and
  // Getting the applicants information
  async function openModal(jobseekerId) {
    getResume(jobseekerId);
    getJobseekersApplications(jobseekerId);
    setOpen(true);
  }
  return (
    <div style={{ minHeight: "80vh", marginTop: "40px" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{ad.jobTitle}</Card.Header>
          <Card.Meta>{ad.location.name}</Card.Meta>
          <Card.Description>{ad.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Header>Applicants:</Card.Header>
          <List selection horizontal ordered>
            {applicants ? (
              applicants.map((applicant) => (
                <Modal
                  key={applicant.id}
                  open={open}
                  onClose={() => setOpen(false)}
                  onOpen={() => openModal(applicant.jobseeker.id)}
                  trigger={
                    <List.Item>
                      <List.Content>
                        <List.Header
                          onClick={() => openModal(applicant.jobseeker.id)}
                        >
                          {applicant.jobseeker.firstName +
                            " " +
                            applicant.jobseeker.lastName}
                        </List.Header>
                        {applicant.jobseeker.jobTitle}
                      </List.Content>
                    </List.Item>
                  }
                >
                  <Modal.Header>
                    {applicant.jobseeker.firstName +
                      " " +
                      applicant.jobseeker.lastName}
                  </Modal.Header>
                  <Modal.Content image scrolling>
                    {resume.id !== 0 ? (
                      <Image
                        size="medium"
                        src={`${resume.images[0].imageUrl}`}
                        wrapped
                      />
                    ) : (
                      <Image
                        size="medium"
                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                        wrapped
                      />
                    )}

                    <Modal.Description>
                      <Card style={{ marginBottom: 10, width: "35em" }} fluid>
                        <Card.Content header="About" />
                        <Card.Content
                          description={resume.abouts.map(
                            (about) => about.about
                          )}
                        />
                      </Card>
                      <Card style={{ marginBottom: 10 }} fluid>
                        <Card.Content header="Experiences" />
                        <Card.Content
                          description={resume.experiences.map((exp) => (
                            <Card key={exp.id} fluid>
                              <Card.Content>
                                <Card.Header>{exp.jobTitle}</Card.Header>
                                <Card.Meta>{exp.company}</Card.Meta>
                                <Card.Meta>
                                  {exp.startDate} -{" "}
                                  {exp.endDate ? exp.endDate : "Present"}
                                </Card.Meta>
                                <Card.Description>
                                  {exp.description}
                                </Card.Description>
                              </Card.Content>
                            </Card>
                          ))}
                        />
                      </Card>
                      <Card style={{ marginBottom: 10 }} fluid>
                        <Card.Content header="Education" />
                        <Card.Content
                          description={
                            resume.educations
                              ? resume.educations.map((edu) => (
                                <Card key={edu.id} fluid>
                                  <Card.Content>
                                    <Card.Header>
                                      {edu.schoolName}
                                    </Card.Header>
                                    <Card.Meta>{edu.department}</Card.Meta>
                                    <Card.Meta>
                                      {edu.startDate} - {edu.endDate}
                                    </Card.Meta>
                                  </Card.Content>
                                </Card>
                              ))
                              : "yok edu"
                          }
                        />
                      </Card>
                      <Card style={{ marginBottom: 10 }} fluid>
                        <Card.Content header="Skills" />
                        <Card.Content
                          description={
                            <ul>
                              {resume.skills
                                ? resume.skills.map((skill) => (
                                  <li key={skill.id}>{skill.skillTitle}</li>
                                ))
                                : "yok"}
                            </ul>
                          }
                        />
                      </Card>
                      <Card style={{ marginBottom: 10 }} fluid>
                        <Card.Content header="Applications" />
                        <Card.Content
                          description={
                            jobseekerApplications
                              ? jobseekerApplications.map((application) => (
                                <Card key={application.id} fluid>
                                  <Card.Content>
                                    <Card.Header>
                                      {application.advertisement.jobTitle}
                                    </Card.Header>
                                    <Card.Meta>
                                      {application.advertisement.description}
                                    </Card.Meta>
                                  </Card.Content>
                                </Card>
                              ))
                              : "yok application"
                          }
                        />
                      </Card>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => setOpen(false)} primary>
                      <Icon name="x" />
                      Close
                    </Button>
                  </Modal.Actions>
                </Modal>
              ))
            ) : (
              <List.Header>There is no applicant</List.Header>
            )}
          </List>
        </Card.Content>
      </Card>
    </div>
  );
}
