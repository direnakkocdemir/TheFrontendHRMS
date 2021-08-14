import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import AboutService from "../../services/aboutService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EmployerAboutBox(props) {
  const id = props.id;

  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const [about, setAbout] = useState([]);

  let aboutService = new AboutService();
  const history = useHistory();

  async function getEmployerAbout() {
    try {
      const result = await aboutService.getEmployerAboutByEmployerId(
        authItem[0].user.id,
        token
      );
      setAbout(result.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function deleteAbout() {
    try {
      const response = await aboutService.deleteEmployerAbout({ id: about[0].id }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(async () => {
    getEmployerAbout();
  }, [props,authItem]);

  function goSettings() {
    history.push("/emabout");
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70vw",
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
            paddingLeft: "20px",
            paddingRight: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>About</h5>
          <Button.Group>
            <Button icon="add" onClick={goSettings} />
            <Button icon="x" onClick={() => deleteAbout()} />
          </Button.Group>
        </div>
        <div style={{ padding: "20px" }}>
          {about ? (
            about.map((about) => <p key={about.id}>{about.about}</p>)
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
