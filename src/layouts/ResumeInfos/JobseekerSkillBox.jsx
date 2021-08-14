import React, { useEffect, useState } from "react";
import { Button,List } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import SkillService from "../../services/skillService"
import { toast } from "react-toastify";

export default function JobseekerSkillBox(props) {
  const resume = props.resume;

  const { token } = useSelector(state => state.auth)

  let [skill, setSkill] = useState([]);

  const history = useHistory();

  async function getSkills(){
    setSkill(resume.skills);
  }

  const skillService = new SkillService();
  async function deleteSkill(skillId) {
    try {
      const response = await skillService.deleteSkill({ id: skillId }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
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
          <Button icon="add" onClick={goSettings}/>
        </div>
        <div style={{ padding: "20px" }}>
        <List>
            {skill
              ? skill.map((skill) => (
                <List.Item key={skill.id}>
                  <Button floated="right" size="mini" icon="x" onClick={()=>deleteSkill(skill.id)}/>
                  <List.Header>{skill.skillTitle}</List.Header>
                </List.Item>)) : null}
          </List>
          {/* <ul>
            {skill
              ? skill.map((skill) => <li key={skill.id}>{skill.skillTitle}</li>)
              : null}
          </ul> */}
        </div>
      </div>
    </div>
  );
}
