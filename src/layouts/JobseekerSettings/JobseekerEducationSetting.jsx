import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import EducationService from "../../services/educationService";
import { toast } from "react-toastify";

export default function JobseekerEducationSetting() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  //State to keep the education changes to use
  const [education, setEducation] = useState({
    jobseekerId: authItem[0].user.id,
  });

  //Service to use the Http requests 
  let educationService = new EducationService();
  const history = useHistory();// For using the router to change the component

  // Function to post the education to backend
  async function submitEducation() {
    try {
      const response = await educationService.postEducation(
        education,
        token
      );
      toast.success(response.data.message);
      history.push("/profile"); // If function works successfully, go to jobseeker profile page 
    } catch (err) {
      toast.error(err.response.data.message); // throwing error message by toast
    }
  }
  // Function to handle the changes in education state
  let changeHandler = (e) =>
    setEducation({ ...education, [e.target.name]: e.target.value });
  return (
    <div style={{ minHeight: "80vh" }}>
      <Segment>
        <Form>
          <Form.Input
            name="schoolName"
            label="School Name"
            placeholder="School..."
            onChange={changeHandler}
          />
          <Form.Input
            name="department"
            label="Department"
            placeholder="Department..."
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
          <Button onClick={submitEducation}>Submit</Button>
        </Form>
      </Segment>
    </div>

  );
}
