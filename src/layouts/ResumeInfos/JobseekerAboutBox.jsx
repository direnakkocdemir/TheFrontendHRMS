import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import AboutService from '../../services/aboutService'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function JobseekerAboutBox(props) {
  //Prop to use in this component from parent
  const resume = props.resume;
  //Redux states to use in the component
  const { token } = useSelector(state => state.auth)
  //State to keep the about
  let [about, setAbout] = useState([]);

  const history = useHistory();// For using the router to change the component

  // Function to divide the result and set the about
  async function getAbout() {
    setAbout(resume.abouts);
  }

  //Service to use the Http requests 
  const aboutService = new AboutService();

  //Function to delete the jobseeker's about from the system
  async function deleteAbout() {
    try {
      const response = await aboutService.deleteAbout({ id: about[0].id }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  //hook for taking action to dividing resume for about state
  // if props(resume) change, hook works again 
  useEffect(() => {
    getAbout();
  }, [props]);

  //Fuction to go to setting component
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
