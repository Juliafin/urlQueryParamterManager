import React from 'react';

import {Container, TextField} from '@material-ui/core';


export const Profile = (props) => {
  return (
    <Container>
      <h2>Create a Profile</h2>
      <form>
        <TextField id="standard-basic" label="profile"/>
      </form>


    </Container>
  )
}