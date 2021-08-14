import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ExperienceService from "../../services/experienceService"
import { toast } from "react-toastify";

export default function JobseekerExperience(props) {
    const resume = props.resume;
    const { token } = useSelector(state => state.auth)

    let [experiences, setExperiences] = useState([]);
  
    const history = useHistory();
  
    async function getExperiences() {
      setExperiences(resume.experiences);
    }

    const experienceService = new ExperienceService();
    async function deleteExperience(experienceId) {
      try {
        const response = await experienceService.deleteExperience({ id: experienceId }, token);
        toast.success(response.data.message);
        history.push("/");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  
    useEffect(() => {
      getExperiences();
    }, [props]);
  
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
          <div style={{ padding: "20px", display: "flex",flexDirection:"column" }}>
            {experiences ? (
              experiences.map((exp) => (
                <Card key={exp.id} fluid>
                  <Card.Content>
                    <Button floated="right" size="mini" icon="x" onClick={()=>deleteExperience(exp.id)}/>
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
