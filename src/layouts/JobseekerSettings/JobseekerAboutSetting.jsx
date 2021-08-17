import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import AboutService from "../../services/aboutService";
import { toast } from "react-toastify";

export default function JobseekerAboutSetting() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  //State to keep the about to use
  const [about, setAbout] = useState({
    about: "",
    jobseekerId: authItem[0].user.id,
  });

  //Service to use the Http requests 
  let aboutService = new AboutService();
  const history = useHistory();// For using the router to change the component

  // Function to post the about to backend
  async function submitAbout() {
    try {
      const response = await aboutService.postAbout(
        about,
        token
      );
      toast.success(response.data.message);
      history.push("/profile"); // If function works successfully, go to jobseeker profile page 
    } catch (err) {
      toast.error(err.response.data.message); // throwing error message by toast
    }
  }
  // Function to handle the changes in about state
  let changeHandler = (e, { value }) => setAbout({ ...about, about: value });
  return (
    <div style={{ minHeight: "80vh" }}>
      <Segment>
        <Form>
          <Form.TextArea
            name="about"
            label="About"
            placeholder="About..."
            onChange={changeHandler}
          />
          <Button onClick={submitAbout}>Submit</Button>
        </Form>
      </Segment>
    </div>

  );
}
