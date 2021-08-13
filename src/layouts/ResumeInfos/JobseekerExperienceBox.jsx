import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function JobseekerExperience(props) {
    const resume = props.resume;
  
    let [experiences, setExperiences] = useState([]);
  
    const history = useHistory();
  
    async function getExperiences() {
      setExperiences(resume.experiences);
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
            <Button icon="pencil" onClick={goSettings} />
          </div>
          <div style={{ padding: "20px", display: "flex",flexDirection:"column" }}>
            {experiences ? (
              experiences.map((exp) => (
                <Card key={exp.id} fluid>
                  <Card.Content>
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
