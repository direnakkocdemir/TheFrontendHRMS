import React, { useState, useEffect } from "react";
import ApplicationService from "../../services/applicationService";
import { Card, Button } from "semantic-ui-react"
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'


export default function JobseekerApplicationBox(props) {
  const id = props.id;

  const { authItem } = useSelector((state) => state.auth);

  const [applications, setApplications] = useState([]);

  let applicationService = new ApplicationService();

  async function getApplications() {
    try {
      const response = await applicationService.getApplicationByJobseekerId(id, authItem[0].user.token);
      setApplications(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  useEffect(() => {
    getApplications();
  }, [id]);

  return (
    <div>
      <div
        style={{
          width: "50vw",
          height: "100%",
          border: "1px solid #CCD5AE",
          borderRadius: "5px",
          marginBottom: "5vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#F7F7F7",
            height: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>Applications</h5>
        </div>
        <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>

          {applications ? (
            applications.map((application) => (
              <Card key={application.id} fluid>
                <Card.Content>
                  <Card.Header>{application.advertisement.jobTitle}</Card.Header>
                  <Card.Meta>{application.advertisement.location.name}</Card.Meta>
                  <Card.Description>{application.advertisement.description}</Card.Description>
                </Card.Content>
              </Card>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
