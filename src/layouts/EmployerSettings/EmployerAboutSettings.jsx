import React, { useState, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import AboutService from "../../services/aboutService";
import { toast } from "react-toastify";

export default function EmployerAboutSettings() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);

  //State to keep the about to change
  const [about, setAbout] = useState({ about: "", employerId: authItem[0].user.id });

  //Service to use the Http requests 
  let aboutService = new AboutService();
  const history = useHistory();// For using the router to change the component

  //Function to post the about to backend
  async function submitAbout() {
    try {
      const response = await aboutService.postEmployerAbout(
        about,
        authItem[0].user.token
      );
      toast.success(response.data.message);
      history.push("/profileEmployer"); // If function works successfully, go to employer profile page 
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  
  //Function to handle changing about state
  let changeHandler = (e, { value }) => setAbout({ ...about, about: value });
  return (
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
  );
}
