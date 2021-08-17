import React, { useState } from "react";
import UserService from "../../services/userService";
import { Button, Form, Segment, Input, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupJobseekerBox() {

  // State the keep registration informations for this component
  const [registerJobseeker, setRegisterJobseeker] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    jobTitle: "",
    password: "",
    confirmPassword: "",
  });

  //Service to use the Http requests 
  let userService = new UserService();
  const history = useHistory(); // For using the router to change the component

  // Function to register the system for jobseeker
  async function signup() {
    try {
      const result = await userService.registerJobseeker(registerJobseeker);
      toast.success(result.data.message);
      history.push("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }

  }

  // Function to handle the changes in registerJobseeker state
  let changeHandler = (e) =>
    setRegisterJobseeker({
      ...registerJobseeker,
      [e.target.name]: e.target.value,
    });

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "40px 0 40px 0"
      }}
    >
      <Header as="h1" color="teal" textAlign="center">
        Register
      </Header>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="firstName"
              label="First Name"
              placeholder="First name"
              onChange={changeHandler}
            />
            <Form.Field
              control={Input}
              name="lastName"
              label="Last Name"
              placeholder="Last name"
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
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="dateOfBirth"
              label="Date Of Birth"
              type="date"
              onChange={changeHandler}
            />
            <Form.Field
              control={Input}
              name="jobTitle"
              label="Job Title"
              placeholder="Job Title"
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
