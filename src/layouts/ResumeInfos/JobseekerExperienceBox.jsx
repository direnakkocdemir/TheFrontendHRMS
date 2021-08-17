import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ExperienceService from "../../services/experienceService"
import { toast } from "react-toastify";

export default function JobseekerExperience(props) {
  //Prop to use in this component from parent
  const resume = props.resume;
  //Redux states to use in the component
  const { token } = useSelector(state => state.auth)
  // State to keep the experiences for this component
  let [experiences, setExperiences] = useState([]);

  const history = useHistory();// For using the router to change the component

  // Function to divide the the resume and set the experiences state 
  async function getExperiences() {
    setExperiences(resume.experiences);
  }

  //Service to use the Http requests 
  const experienceService = new ExperienceService();

  //Function to delete the jobseeker's chosen experience by id from the system
  async function deleteExperience(experienceId) {
    try {
      const response = await experienceService.deleteExperience({ id: experienceId }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //hook for taking action to dividing resume for experiences state
  // if props(resume) change, hook works again 
  useEffect(() => {
    getExperiences();
  }, [props]);

  //Fuction to go to setting component
  function goSettings() {
    history.push("/jsexperience");
  }

  return (
    <div>
      <div
        style={{
          width: "50vw",
          height: "100%",
          border: "1px solid #CCD5AE",
          borderRadius: "5px",
          marginBottom: "5vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#F7F7F7",
            height: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>Experiences</h5>
          <Button icon="add" onClick={goSettings} />
        </div>
        <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
          {experiences ? (
            experiences.map((exp) => (
              <Card key={exp.id} fluid>
                <Card.Content>
                  <Button floated="right" size="mini" icon="x" onClick={() => deleteExperience(exp.id)} />
                  <Card.Header>{exp.jobTitle}</Card.Header>
                  <Card.Meta>{exp.company}</Card.Meta>
                  <Card.Description>{exp.description}</Card.Description>
                  <Card.Meta>
                    {exp.startDate} - {exp.endDate}
                  </Card.Meta>

                </Card.Content>
              </Card>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
