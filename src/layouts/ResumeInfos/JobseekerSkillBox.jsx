import React, { useEffect, useState } from "react";
import { Button, List } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import SkillService from "../../services/skillService"
import { toast } from "react-toastify";

export default function JobseekerSkillBox(props) {
  const resume = props.resume;
  //Redux states to use in the component
  const { token } = useSelector(state => state.auth)
  // State to keep the skill for this component
  let [skill, setSkill] = useState([]);

  const history = useHistory();// For using the router to change the component

  // Function to divide the the resume and set the skill state 
  async function getSkills() {
    setSkill(resume.skills);
  }
  //Service to use the Http requests 
  const skillService = new SkillService();

  //Function to delete the jobseeker's chosen skill by id from the system
  async function deleteSkill(skillId) {
    try {
      const response = await skillService.deleteSkill({ id: skillId }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //hook for taking action to dividing resume for skill state
  // if props(resume) change, hook works again 
  useEffect(() => {
    getSkills();
  }, [props]);

  //Fuction to go to setting component
  function goSettings() {
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
            justifyContent: 'space-between',
            padding: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>Skills</h5>
          <Button icon="add" onClick={goSettings} />
        </div>
        <div style={{ padding: "20px" }}>
          <List>
            {skill
              ? skill.map((skill) => (
                <List.Item key={skill.id}>
                  <Button floated="right" size="mini" icon="x" onClick={() => deleteSkill(skill.id)} />
                  <List.Header>{skill.skillTitle}</List.Header>
                </List.Item>)) : null}
          </List>
        </div>
      </div>
    </div>
  );
}
