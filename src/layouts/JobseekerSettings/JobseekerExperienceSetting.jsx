import React, { useState, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import ExperienceService from "../../services/experienceService";
import { toast } from "react-toastify";

export default function JobseekerExperienceSetting() {
  const { authItem } = useSelector((state) => state.auth);

  const [experience, setExperience] = useState({
    jobseekerId: authItem[0].user.id,
  });

  let experienceService = new ExperienceService();
  const history = useHistory();

  async function submitExperience() {
    try {
      const response = await experienceService.postExperience(
        experience,
        authItem[0].user.token
      );
      toast.success(response.data.message);
      history.push("/profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  let changeHandler = (e) =>
    setExperience({ ...experience, [e.target.name]: e.target.value });

  return (
    <Segment>
      <Form>
        <Form.Input
          name="company"
          label="Company"
          placeholder="Company..."
          onChange={changeHandler}
        />
        <Form.Input
          name="jobTitle"
          label="Job Title"
          placeholder="Job Title..."
          onChange={changeHandler}
        />
        <Form.Input
          name="description"
          label="Description"
          placeholder="Description..."
          onChange={changeHandler}
        />
        <Form.Input
          name="startDate"
          label="Start Date"
          type="date"
          onChange={changeHandler}
        />
        <Form.Input
          name="endDate"
          label="End Date"
          type="date"
          onChange={changeHandler}
        />
        <Button onClick={submitExperience}>Submit</Button>
      </Form>
    </Segment>
  );
}
