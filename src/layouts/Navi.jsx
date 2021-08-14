import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Popup, Menu } from "semantic-ui-react";
import "../App.css";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {
  const { authItem } = useSelector((state) => state.auth);

  const location = {
    pathname: "/ads",
    state: { jobTitle: "", location: "" },
  };

  return (
    <Menu size="large"  stackable color="teal">
      <Menu.Item active style={{fontSize:'25px'}} name="JOBBY" as={Link} to={"/"} color={"purple"} />
      {authItem[0].loggedIn && authItem[0].user.userType === 1 ? (
        <Menu.Item>
          <Menu.Item  name="Search A Job" as={Link} to={location} />
          <Popup
            content="You can't advertise a job"
            trigger={<Menu.Item name="Advertise A Job" as={Link} to={"/"} />}
          />
        </Menu.Item>
      ) : authItem[0].loggedIn && authItem[0].user.userType === 2 ? (
        <Menu.Item>
          <Menu.Item  name="Search A Job" as={Link} to={location} />
          <Menu.Item name="Advertise A Job" as={Link} to={"/advertiseajob"} />
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Menu.Item  style={{fontSize:'20px'}} name="Search A Job" as={Link} to={location}  />
          <Menu.Item  style={{fontSize:'20px'}} name="Advertise A Job" as={Link} to={"/login"} />
        </Menu.Item>
      )}

      <Menu.Item position="right" style={{ margin: "0.5em" }}>
        {authItem[0].loggedIn ? <SignedIn /> : <SignedOut />}
      </Menu.Item>
    </Menu>
  );
}
