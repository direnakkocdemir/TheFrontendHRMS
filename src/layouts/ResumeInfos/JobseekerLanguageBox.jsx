import React, { useEffect, useState } from "react";
import { Button, List } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageService from "../../services/languageService";
import { toast } from "react-toastify";

export default function JobseekerLanguageBox(props) {
  const resume = props.resume;
  //Redux states to use in the component
  const { token } = useSelector(state => state.auth)
  // State to keep the language for this component
  let [language, setLanguage] = useState([]);

  const history = useHistory();// For using the router to change the component

  // Function to divide the the resume and set the language state 
  async function getLanguages() {
    setLanguage(resume.languages);
  }
  //Service to use the Http requests 
  const languageService = new LanguageService();

  //Function to delete the jobseeker's chosen language by id from the system
  async function deleteLanguage(languageId) {
    try {
      const response = await languageService.deleteLanguage({ id: languageId }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  //hook for taking action to dividing resume for language state
  // if props(resume) change, hook works again 
  useEffect(() => {
    getLanguages();
  }, [props]);
  //Fuction to go to setting component
  function goSettings() {
    history.push("/jslanguage");
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
          <h5 style={{ margin: "0" }}>Language</h5>

          <Button icon="add" onClick={goSettings} />
        </div>
        <div style={{ padding: "20px 0 20px 40px" }}>
          <List>
            {language
              ? language.map((lang) => (
                <List.Item key={lang.id}>
                  <Button floated="right" size="mini" icon="x" onClick={() => deleteLanguage(lang.id)} />
                  <List.Header>{lang.language}</List.Header>Level: {lang.level}
                </List.Item>)) : null}
          </List>
        </div>
      </div>
    </div>
  );
}
