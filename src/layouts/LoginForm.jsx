import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import UserService from "../services/userService";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authActions";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function LoginForm() {

  // Redux functions to use the redux actions
  const dispatch = useDispatch();
  const handleLogin = (user) => {
    dispatch(userLogin(user));
  };

  //Service to use the Http requests 
  let userService = new UserService();
  const history = useHistory(); // For using the router to change the component

  // Yup extension for validation
  const userLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("You should complete this section")
      .email("Please add an valid email"),
    password: Yup.string().required("You should complete this section"),
  });

  // Form format with own helper functions
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await userService.login(values);
        handleLogin(response.data.data);
        toast.success(response.data.message);
        history.push("/");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
  });

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header as="h1" color="teal" textAlign="center">
        Login
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div>
            <label>
              <b>Email</b>
            </label>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.email}
              </div>
            )}
          </div>
          <div style={{ marginTop: "1em" }}>
            <label>
              <b>Password</b>
            </label>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.password}
              </div>
            )}
          </div>

          <Button
            color="teal"
            fluid
            size="large"
            type="submit"
            style={{ marginTop: "1em" }}
          >
            Login
          </Button>
        </Segment>
      </Form>
      <Message info>
        Create your account{" "}
        <b>
          <Link to={"/register"}>Register</Link>
        </b>
      </Message>
    </div>
  );
}
