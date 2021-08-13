import React from 'react'
import "./App.css";
import Home from "./pages/Home";
import Navi from "./layouts/Navi";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css"
import Footer from "./layouts/Footer";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="App">
        <Home />
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
