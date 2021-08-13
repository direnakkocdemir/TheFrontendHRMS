import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import LanguageService from "../../services/languageService";
import { toast } from "react-toastify";

export default function JobseekerLanguageSetting() {
  const { authItem } = useSelector((state) => state.auth);

  const [language, setLanguage] = useState({
    language: "",
    level: 0,
    jobseekerId: authItem[0].user.id,
  });

  let languageService = new LanguageService();
  const history = useHistory();

  async function submitLanguage() {
    try {
      const response = await languageService.postLanguage(
        language,
        authItem[0].user.token
      );
      toast.success(response.data.message);
      history.push("/profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  let changeHandler = (e) =>
    setLanguage({ ...language, [e.target.name]: e.target.value });
  return (
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
  );
}
