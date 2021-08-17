import React, { useState, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import ExperienceService from "../../services/experienceService";
import { toast } from "react-toastify";

export default function JobseekerExperienceSetting() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  //State to keep the experience changes to use
  const [experience, setExperience] = useState({
    jobseekerId: authItem[0].user.id,
  });
  //Service to use the Http requests 
  let experienceService = new ExperienceService();
  const history = useHistory();// For using the router to change the component

  // Function to post the experience to backend
  async function submitExperience() {
    try {
      const response = await experienceService.postExperience(
        experience,
        token
      );
      toast.success(response.data.message);
      history.push("/profile"); // If function works successfully, go to jobseeker profile page 
    } catch (err) {
      toast.error(err.response.data.message); // throwing error message by toast
    }
  }
  // Function to handle the changes in experience state
  let changeHandler = (e) =>
    setExperience({ ...experience, [e.target.name]: e.target.value });

  return (
    <div style={{ minHeight: "80vh" }}>
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
    </div>

  );
}
