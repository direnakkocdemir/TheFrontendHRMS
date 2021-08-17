import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Segment, Button } from "semantic-ui-react";
import SkillService from "../../services/skillService";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

export default function JobseekerSkillSetting() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  //State to keep the skill changes to use
  const [skill, setSkill] = useState({
    skillTitle: "",
    jobseekerId: authItem[0].user.id,
  });
  //Service to use the Http requests 
  let skillService = new SkillService();
  const history = useHistory();// For using the router to change the component

  // Function to post the skill to backend
  async function submitSkill() {
    try {
      const response = await skillService.postSkill(
        skill,
        token
      );
      toast.success(response.message);
      history.push("/profile"); // If function works successfully, go to jobseeker profile page 
    } catch (err) {
      toast.error(err.response.data.message); // throwing error message by toast
    }
  }
  // Function to handle the changes in skill state
  let changeHandler = (e, { value }) =>
    setSkill({ ...skill, skillTitle: value });

  return (
    <div style={{ minHeight: "80vh" }}>
      <Segment>
        <Form>
          <Form.Input
            label="Skill"
            name="skillTitle"
            placeholder="Skill..."
            onChange={changeHandler}
          />
          <Button onClick={submitSkill}>Submit</Button>
        </Form>
      </Segment>
    </div>

  );
}
