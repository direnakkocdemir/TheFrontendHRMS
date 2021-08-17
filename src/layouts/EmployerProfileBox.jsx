import React, { useState, useEffect } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EmployerService from "../services/employerService";
import { useHistory } from "react-router-dom";


export default function EmployerProfileBox() {

  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  // State to keep the employer's information
  const [employer, setEmployer] = useState({
    id: 0,
    companyName: "",
    website: "",
    phone: "",
    publishedAt: 0,
    industry: "",
  });

  //Service to use the Http requests 
  let employerService = new EmployerService();
  const history = useHistory(); // For using the router to change the component

  // component path name and state
  const location = {
    pathname: "/upload",
    state: { userId: authItem[0].user.id, token: token },
  };

  // Function to get employer's information from the database 
  async function getEmployerInfo() {
    try {
      const response = await employerService.getEmployerInfoById(
        authItem[0].user.id,
        token
      );
      setEmployer(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  // hook for taking action to get employer's information
  // if authItem changes, hook works again
  useEffect(async () => {
    getEmployerInfo();
  }, [authItem]);

  return (
    <div>
      <div
        style={{
          width: "70vw",
          height: "100%",
          border: "1px solid #CCD5AE",
          borderRadius: "5px",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
      >
        <img
          style={{ width: "100%", height: "200px" }}
          src="https://i.pinimg.com/originals/a3/af/35/a3af356c5d57a46a1abdf37421ce3ac3.jpg"
        />
        <div>
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "space-between",
            }}
          >
            <div
              style={{ width: "80%", display: "flex", alignItems: "flex-end" }}
            >
              <img
                style={{
                  marginTop: "-75px",
                  width: "150px",
                  height: "150px",
                  marginRight: "20px",
                  border: "0.5px solid gray",
                  borderRadius: "10px",
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5mkQ_Fkv2jCvUECw-LZNysHenMNi6BOptRw&usqp=CAU"
              />
              <h5>{employer.companyName}</h5>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button.Group vertical>
                <Button
                  size="mini"
                  icon
                  labelPosition="left"
                  onClick={() => {
                    history.push(location);
                  }}
                >
                  <Icon name="photo" />
                  Upload
                </Button>
                <Button size="mini" icon labelPosition="left">
                  Setting
                  <Icon name="setting" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <table style={{ width: "50vw" }}>
            <tr>
              <td>
                <strong>Website</strong>
              </td>
              <td>
                :<span>&nbsp;</span>
                {employer && employer.website ? employer.website : "-"}
              </td>
              <td>
                <strong>Published Year</strong>
              </td>
              <td>
                :<span>&nbsp;</span>
                {employer && employer.publishedAt ? employer.publishedAt : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phone Number</strong>
              </td>
              <td>
                :<span>&nbsp;</span>
                {employer && employer.phone ? employer.phone : "-"}
              </td>
              <td>
                <strong>Industry</strong>
              </td>
              <td>
                :<span>&nbsp;</span>
                {employer && employer.industry ? employer.industry : "-"}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
