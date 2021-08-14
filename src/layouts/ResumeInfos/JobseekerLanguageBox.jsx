import React, { useEffect, useState } from "react";
import { Button, List } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageService from "../../services/languageService";
import { toast } from "react-toastify";

export default function JobseekerLanguageBox(props) {
  const resume = props.resume;

  const { token } = useSelector(state => state.auth)

  let [language, setLanguage] = useState([]);

  const history = useHistory();

  async function getLanguages() {
    setLanguage(resume.languages);
  }

  const languageService = new LanguageService();
  async function deleteLanguage(languageId) {
    try {
      const response = await languageService.deleteLanguage({ id: languageId }, token);
      toast.success(response.data.message);
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    getLanguages();
  }, [props]);

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
                  <Button floated="right" size="mini" icon="x" onClick={()=>deleteLanguage(lang.id)}/>
                  <List.Header>{lang.language}</List.Header>Level: {lang.level}
                </List.Item>)) : null}
          </List>
          {/* <ul>
            {language
              ? language.map((lang) => (
                  <li key={lang.id}>
                    {lang.language} - Level: {lang.level}
                  </li>
                ))
              : null}
          </ul> */}
        </div>
      </div>
    </div>
  );
}
