import React, { useState } from "react";
import { Grid, Input, Segment, Button, Label } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function SearchBox() {
  const [jobTitle, setJobTitle] = useState("");
  const [locations, setLocations] = useState("");

  const location = {
    pathname: "/ads",
    state: { jobTitle: jobTitle.value, location: locations.value },
  };
  const history = new useHistory();
  async function search() {
    console.log(location);
    history.push(location);
  }

  let handleJobTitle = (e, { value }) => setJobTitle({ value });
  let handleLocation = (e, { value }) => setLocations({ value });

  return (
    <div style={{height:"85vh", width:"100%", display:"flex",justifyContent:"center",flexDirection:"column"}} >
      <Label  size="massive" color="transparent" >
        Are you looking for a job? </Label>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={7} textAlign="center" verticalAlign="middle">
              <Input
                transparent
                size="massive"
                placeholder="Job Title..."
                name="jobTitle"
                onChange={handleJobTitle}
              />
            </Grid.Column>
            <Grid.Column width={7} textAlign="center" verticalAlign="middle">
              <Input
                transparent
                size="massive"
                placeholder="Location..."
                name="locations"
                onChange={handleLocation}
              />
            </Grid.Column>
            <Grid.Column width={2} textAlign="center" verticalAlign="middle">
              <Button
                inverted
                color="purple"
                size="huge"
                icon="search"
                onClick={search}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
