import React from 'react';

import {Container, TextField} from '@material-ui/core';


export const Configuration = (props) => {
  return (
    <Container>
      <h2>Configuration name</h2>
      <form>
        <TextField
          id="standard-basic"
          onChange={props.configurationChangeHandler}
          label="Configuration"/>
      </form>


    </Container>
  )
}