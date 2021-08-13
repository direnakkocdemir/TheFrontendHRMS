import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import AdsList from "../layouts/AdsList";
import Filter from "../layouts/Filter";

export default function Advertisements(props) {
  const jobTitle = props.location.state.jobTitle;
  const locations = props.location.state.location;

  const location = {
    state: { jobTitle: jobTitle, location: locations },
  };
  useEffect(() => {
      async function update(){
          location.state.jobTitle=props.location.state.jobTitle;
          location.state.location=props.location.state.location;
      }
      update();
  }, [props]);

  return (
    <div 
    style={{
      margin:"40px 0 40px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Grid>
        <Grid.Column width={4}>
          <Filter/>
        </Grid.Column>
        <Grid.Column width={12}>
          <AdsList location={location} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
