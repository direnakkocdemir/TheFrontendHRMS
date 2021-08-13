import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function JobseekerEducationBox(props) {
  const resume = props.resume;

  let [education, setEducation] = useState([]);

  const history = useHistory();

  async function getEducations() {
    setEducation(resume.educations);
  }

  useEffect(() => {
    getEducations();
  }, [props]);

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
          <Button icon="pencil" onClick={goSettings} />
        </div>
        <div style={{ padding: "20px", display: "flex",flexDirection:"column" }}>
          {education ? (
            education.map((edu) => (
              <Card key={edu.id} fluid>
                <Card.Content>
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
