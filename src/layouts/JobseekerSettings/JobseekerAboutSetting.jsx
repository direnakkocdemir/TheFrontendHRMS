import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import AboutService from "../../services/aboutService";
import { toast } from "react-toastify";

export default function JobseekerAboutSetting() {
  const { authItem } = useSelector((state) => state.auth);

  const [about, setAbout] = useState({
    about: "",
    jobseekerId: authItem[0].user.id,
  });

  let aboutService = new AboutService();
  const history = useHistory();

  async function submitAbout() {
    try {
      const response = await aboutService.postAbout(
        about,
        authItem[0].user.token
      );
      toast.success(response.data.message);
      history.push("/profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

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
