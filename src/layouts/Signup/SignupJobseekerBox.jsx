import React, { useState } from "react";
import UserService from "../../services/userService";
import { Button, Form, Segment, Input, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function SignupJobseekerBox() {
  const [registerJobseeker, setRegisterJobseeker] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    jobTitle: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();
  let userService = new UserService();

  async function signup() {
    const result = await userService.registerJobseeker(registerJobseeker);
    console.log(result.data);
    history.push("/login");
  }
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
        margin:"40px 0 40px 0"
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
