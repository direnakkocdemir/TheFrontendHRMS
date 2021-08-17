import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Popup } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function Footer() {
  
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);

  return (
    <div
      style={{
        backgroundColor: "#adb5bd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "5em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#9b5de5", fontSize: "4em" }}>Jobby.ie</h1>
      </div>
      <div style={{ width: "100%" }}>
        <ul
          style={{
            width: "100%",
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            color: "black",
          }}
        >
          <li>
            <Button
              color="google plus"
              content="Search A Job"
              basic
              as={Link}
              to={"/search"}
            />
          </li>

          <li>
            {authItem[0].loggedIn && authItem[0].user.userType === 2 ? (
              <Button
                color="google plus"
                content="Advertise A Job"
                basic
                as={Link}
                to={"/advertiseajob"}
              />
            ) : (
              <Popup
                content="You can't advertise a job"
                trigger={
                  <Button
                    color="google plus"
                    content="Advertise A Job"
                    basic
                    as={Link}
                    to={"/"}
                  />
                }
              />
            )}
          </li>
          <li>
            {authItem[0].loggedIn && authItem[0].user.userType === 1 && (
              <Button
                color="google plus"
                content="Profile"
                basic
                as={Link}
                to={"/profile"}
              />
            )}
            {authItem[0].loggedIn && authItem[0].user.userType === 2 && (
              <Button
                color="google plus"
                content="Profile"
                basic
                as={Link}
                to={"/profileEmployer"}
              />
            )}
            {!authItem[0].loggedIn && (
              <Button
                color="google plus"
                content="Profile"
                basic
                as={Link}
                to={"/login"}
              />
            )}
          </li>
          <li>
            {!authItem[0].loggedIn ? <Button color="google plus" content="Signup" basic as={Link}
              to={"/register"} /> : <Popup
              content="You are logged in"
              trigger={
                <Button
                  color="google plus"
                  content="Signup"
                  basic
                  as={Link}
                  to={"/"}
                />
              }
            />}

          </li>
          <li>
            <Button color="google plus" content="Contact Us" basic />
          </li>
        </ul>
      </div>
      <div style={{ width: "100%" }}>
        <ul
          style={{
            width: "100%",
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <li>
            <Button color="google plus" basic>
              <Icon name="facebook" /> Facebook
            </Button>
          </li>
          <li>
            <Button color="google plus" basic>
              <Icon name="instagram" /> Instagram
            </Button>
          </li>
          <li>
            <Button color="google plus" basic>
              <Icon name="twitter" /> Twitter
            </Button>
          </li>

          <li>
            <Button color="google plus" basic>
              <Icon name="google plus" /> Google Plus
            </Button>
          </li>

          <li>
            <Button color="google plus" basic>
              <Icon name="youtube" /> YouTube
            </Button>
          </li>
        </ul>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          borderTop: "0.5px solid black",
        }}
      >
        © www.jobby.ie | Designed by Diren Akkoc Demir
      </div>
    </div>
  );
}
