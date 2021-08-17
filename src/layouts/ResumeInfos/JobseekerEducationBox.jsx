import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import EducationService from "../../services/educationService"
import { useSelector } from "react-redux";


export default function JobseekerEducationBox(props) {
  //Prop to use in this component from parent
  const resume = props.resume;
  //Redux states to use in the component
  const { token } = useSelector(state => state.auth)
  // State to keep the educations for this component
  let [education, setEducation] = useState([]);

  const history = useHistory();// For using the router to change the component

  // Function to divide the the resume and set the education state 
  async function getEducations() {
    setEducation(resume.educations);
  }

  //Service to use the Http requests 
  const educationService = new EducationService();

  //Function to delete the jobseeker's chosen education by id from the system
  async function deleteEducation(educationId) {
    try {
      const response = await educationService.deleteEducation({ id: educationId }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //hook for taking action to dividing resume for education state
  // if props(resume) change, hook works again 
  useEffect(() => {
    getEducations();
  }, [props]);

  //Fuction to go to setting component
  function goSettings() {
    history.push("/jseducation");
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
          <h5 style={{ margin: "0" }}>Education</h5>
          <Button icon="add" onClick={goSettings} />
        </div>
        <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
          {education ? (
            education.map((edu) => (
              <Card key={edu.id} fluid>
                <Card.Content>
                  <Button floated="right" size="mini" onClick={() => deleteEducation(edu.id)} icon="x" />
                  <Card.Header>{edu.schoolName}</Card.Header>
                  <Card.Meta>{edu.department}</Card.Meta>
                  <Card.Meta>
                    {edu.startDate} - {edu.endDate}
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
