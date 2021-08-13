import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import EducationService from "../../services/educationService";
import { toast } from "react-toastify";

export default function JobseekerEducationSetting() {
  const { authItem } = useSelector((state) => state.auth);

  const [education, setEducation] = useState({
    schoolName: "",
    department: "",
    startDate: new Date(),
    endDate: new Date(),
    jobseekerId: authItem[0].user.id,
  });

  let educationService = new EducationService();
  const history = useHistory();

  async function submitEducation() {
    try {
      const response = await educationService.postEducation(
        education,
        authItem[0].user.token
      );
      toast.success(response.data.message);
      history.push("/profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  let changeHandler = (e) =>
    setEducation({ ...education, [e.target.name]: e.target.value });
  return (
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
  );
}
