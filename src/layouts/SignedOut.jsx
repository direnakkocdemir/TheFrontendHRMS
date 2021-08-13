import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function SignedOut() {
    return (
        <div>
            <Button.Group>
              <Button color='pink' size="large" as={Link} to={"/login"}>Login</Button>
              <Button.Or />
              <Button color='purple' size="large" as={Link} to={"/register"}>Signup</Button>
            </Button.Group>
        </div>
    )
}
