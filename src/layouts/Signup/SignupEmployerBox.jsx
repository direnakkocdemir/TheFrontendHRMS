import React, { useState } from "react";
import UserService from "../../services/userService";
import { Button, Form, Segment, Input, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupEmployerBox() {

  // State the keep registration informations for this component
  const [registerEmployer, setRegisterEmployer] = useState({
    companyName: "",
    website: "",
    publishedYear: 0,
    industry: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Service to use the Http requests 
  let userService = new UserService();
  const history = useHistory();// For using the router to change the component

  // Function to register the system for employer
  async function signup() {
    try {
      const result = await userService.registerEmployer(registerEmployer);
      toast.success(result.data.message);
      history.push("/login");
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  // Function to handle the changes in registerEmployer state
  let changeHandler = (e) =>
    setRegisterEmployer({
      ...registerEmployer,
      [e.target.name]: e.target.value,
    });

  return (
    <div style={{
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Header as="h1" color="teal" textAlign="center">
        Employer Register
      </Header>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="companyName"
              label="Company name"
              placeholder="Company name"
              onChange={changeHandler}
            />
            <Form.Field
              control={Input}
              name="website"
              label="Website"
              placeholder="Website"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="email"
              label="Email"
              placeholder="Email"
              onChange={changeHandler}
            />
            <Form.Field
              control={Input}
              name="publishedYear"
              label="Publish Year"
              placeholder="Publish Year"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="phone"
              label="Phone"
              placeholder="Phone"
              onChange={changeHandler}
            />
            <Form.Field
              control={Input}
              name="industry"
              label="Industry"
              placeholder="Industry"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              onChange={changeHandler}
            />
            <Form.Field
              control={Input}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Field control={Button} onClick={signup}>
            Submit
          </Form.Field>
        </Form>
      </Segment>
    </div>
  );
}
