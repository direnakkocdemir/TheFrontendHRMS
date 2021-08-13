import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function JobseekerLanguageBox(props) {
  const resume = props.resume;

  let [language, setLanguage] = useState([]);

  const history = useHistory();

  async function getLanguages(){
    setLanguage(resume.languages);
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
            justifyContent:'space-between',
            padding: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>Language</h5>
          
          <Button icon="pencil" onClick={goSettings}/>
        </div>
        <div style={{ padding: "20px" }}>
          <ul>
            {language
              ? language.map((lang) => (
                  <li key={lang.id}>
                    {lang.language} - Level: {lang.level}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
