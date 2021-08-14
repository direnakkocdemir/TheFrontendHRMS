import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import AboutService from '../../services/aboutService'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



export default function JobseekerAboutBox(props) {
  const resume = props.resume;

  const { token } = useSelector(state => state.auth)

  let [about, setAbout] = useState([]);

  const history = useHistory();

  async function getAbout() {
    setAbout(resume.abouts);
  }

  const aboutService = new AboutService();
  async function deleteAbout() {
    try {
      const response = await aboutService.deleteAbout({ id: about[0].id }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    getAbout();
  }, [props]);

  function goSettings() {
    history.push("/jsabout");
  }

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
            justifyContent: 'space-between',
            padding: "20px",
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
          {about ? about.map((about) => <p key={about.id}>{about.about}</p>) : <p></p>}
        </div>
      </div>
    </div>
  );
}
