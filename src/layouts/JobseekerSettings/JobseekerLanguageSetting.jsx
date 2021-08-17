import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import LanguageService from "../../services/languageService";
import { toast } from "react-toastify";

export default function JobseekerLanguageSetting() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  //State to keep the language changes to use
  const [language, setLanguage] = useState({
    jobseekerId: authItem[0].user.id,
  });
  //Service to use the Http requests 
  let languageService = new LanguageService();
  const history = useHistory();// For using the router to change the component

  // Function to post the language to backend
  async function submitLanguage() {
    try {
      const response = await languageService.postLanguage(
        language,
        token
      );
      toast.success(response.data.message);
      history.push("/profile"); // If function works successfully, go to jobseeker profile page 
    } catch (err) {
      toast.error(err.response.data.message); // throwing error message by toast
    }
  }
  // Function to handle the changes in language state
  let changeHandler = (e) =>
    setLanguage({ ...language, [e.target.name]: e.target.value });
  return (
    <div style={{ minHeight: "80vh" }}>
      <Segment>
        <Form>
          <Form.Input
            name="language"
            label="Language"
            placeholder="Language..."
            onChange={changeHandler}
          />
          <Form.Input
            name="level"
            type="number"
            label="Level"
            max={5}
            min={0}
            onChange={changeHandler}
          />
          <Button onClick={submitLanguage}>Submit</Button>
        </Form>
      </Segment>
    </div>

  );
}
