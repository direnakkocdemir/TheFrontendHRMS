import React, { useState } from "react";
import UserService from "../../services/userService";
import { Button, Form, Segment, Input, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function SignupEmployerBox() {
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

  const history = useHistory();
  let userService = new UserService();

  async function signup() {
    const result = await userService.registerEmployer(registerEmployer);
    console.log(result.data);
    history.push("/login");
  }
  let changeHandler = (e) =>
    setRegisterEmployer({
      ...registerEmployer,
      [e.target.name]: e.target.value,
    });

  return (
    <div style={{
      height: "80vh",
      display: "flex",
      flexDirection:"column",
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
