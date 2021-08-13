import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUsers } from "react-icons/fa";
import { Button } from "semantic-ui-react";

export default function SignupMain() {
  return (
    <div>
      <div
        style={{
          width: "60vw",
          height: "70vh",
          border: "1px solid #CCD5AE",
          borderRadius: "5px",
          marginBottom: "5vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <Button
            style={{
              width: "200px",
              height: "200px",
              fontSize: "30px",
              border: "0.5px solid gray",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            as={Link}
            to={"/register/employer"}
          >
            <FaUser size="60px" />
            Employer
          </Button>
        </div>
        <div>
          <Button
            style={{
              width: "200px",
              height: "200px",
              fontSize: "30px",
              border: "0.5px solid gray",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            as={Link}
            to={"/register/jobseeker"}
          >
            <FaUsers size="60px" />
            Jobseeker
          </Button>
        </div>
      </div>
    </div>
  );
}
