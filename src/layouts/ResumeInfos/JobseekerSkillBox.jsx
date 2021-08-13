import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function JobseekerSkillBox(props) {
  const resume = props.resume;

  let [skill, setSkill] = useState([]);

  const history = useHistory();

  async function getSkills(){
    setSkill(resume.skills);
  }

  useEffect(() => {
    getSkills();
  }, [props]);

  function goSettings(){
    history.push("/jsskill");
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
            justifyContent:'space-between',
            padding: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>Skills</h5>
          <Button icon="pencil" onClick={goSettings}/>
        </div>
        <div style={{ padding: "20px" }}>
          <ul>
            {skill
              ? skill.map((skill) => <li key={skill.id}>{skill.skillTitle}</li>)
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
