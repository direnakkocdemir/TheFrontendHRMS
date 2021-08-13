import React, { useState, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import AboutService from "../../services/aboutService";
import { toast } from "react-toastify";

export default function EmployerAboutSettings() {
  const { authItem } = useSelector((state) => state.auth);

  const [about, setAbout] = useState({ about: "", employerId: authItem[0].user.id });

  let aboutService = new AboutService();
  const history = useHistory();

  async function setEmployerId() {
    setAbout({ ...about, employer: authItem[0].user.id});
  }
  useEffect(() => {
    setEmployerId();
  }, [authItem]);
  async function submitAbout() {
    try {
      const response = await aboutService.postEmployerAbout(
        about,
        authItem[0].user.token
      );
      toast.success(response.data.message);
      history.push("/profileEmployer");
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
