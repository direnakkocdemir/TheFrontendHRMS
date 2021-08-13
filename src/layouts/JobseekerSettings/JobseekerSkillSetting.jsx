import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Segment, Button } from "semantic-ui-react";
import SkillService from "../../services/skillService";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
export default function JobseekerSkillSetting() {
  const { authItem } = useSelector((state) => state.auth);

  const [skill, setSkill] = useState({
    skillTitle: "",
    jobseekerId: authItem[0].user.id,
  });

  let skillService = new SkillService();
  const history = useHistory();

  async function submitSkill() {
    try {
      const response = await skillService.postSkill(
        skill,
        authItem[0].user.token
      );
      toast.success(response.message);
      history.push("/profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  let changeHandler = (e, { value }) =>
    setSkill({ ...skill, skillTitle: value });
  return (
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
  );
}
