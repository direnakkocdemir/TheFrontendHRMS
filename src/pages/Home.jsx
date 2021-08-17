import React from "react";
import { Route } from "react-router-dom";
import Login from "../layouts/LoginForm";
import Signup from "./Signup";
import SignupEmployer from "../layouts/Signup/SignupEmployerBox";
import SignupJobseeker from "../layouts/Signup/SignupJobseekerBox";
import JobseekerProfile from "./JobseekerProfile";
import EmployerProfile from "./EmployerPages/EmployerProfile";
import { Container } from "semantic-ui-react";
import SearchBox from "../layouts/SearchBox";
import Advertisements from "./Advertisements";
import EmployerAdvertiseAJob from "./EmployerPages/EmployerAdvertiseAJob";
import JobseekerAboutSetting from "../layouts/JobseekerSettings/JobseekerAboutSetting";
import JobseekerEducationSetting from "../layouts/JobseekerSettings/JobseekerEducationSetting";
import JobseekerExperienceSetting from "../layouts/JobseekerSettings/JobseekerExperienceSetting";
import JobseekerLanguageSetting from "../layouts/JobseekerSettings/JobseekerLanguageSetting";
import JobseekerSkillSetting from "../layouts/JobseekerSettings/JobseekerSkillSetting";
import EmployerAboutSettings from "../layouts/EmployerSettings/EmployerAboutSettings";
import EmployerApplicationControl from "../layouts/EmployerApplicationControl";
import UploadImage from "./UploadImage";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <Container>
        {/* Routes for each component */}
        <Route exact path="/" component={SearchBox} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/register/employer" component={SignupEmployer} />
        <Route
          exact
          path="/register/jobseeker"
          component={SignupJobseeker}
        />
        <Route exact path="/profile" component={JobseekerProfile} />
        <Route exact path="/profileEmployer" component={EmployerProfile} />
        <Route exact path="/ads" component={Advertisements} />
        <Route
          exact
          path="/advertiseajob"
          component={EmployerAdvertiseAJob}
        />
        <Route exact path="/jsabout" component={JobseekerAboutSetting} />
        <Route
          exact
          path="/jseducation"
          component={JobseekerEducationSetting}
        />
        <Route
          exact
          path="/jsexperience"
          component={JobseekerExperienceSetting}
        />
        <Route
          exact
          path="/jslanguage"
          component={JobseekerLanguageSetting}
        />
        <Route exact path="/jsskill" component={JobseekerSkillSetting} />
        <Route exact path="/emabout" component={EmployerAboutSettings} />
        <Route path="/employer/applications/:id" component={EmployerApplicationControl} />
        <Route path="/upload" component={UploadImage} />
      </Container>
    </div>
  );
}
