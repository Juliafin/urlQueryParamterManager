import React from 'react';
import {Container, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const Configuration = (props) => {
  const { configurationChangeHandler } = props;
  return (
    <Container>
      <h2>Configuration name</h2>

        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={props.configurationOptions}
          onChange={(event, value) => {
            configurationChangeHandler({target: {value}}, 'autocomplete');
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              id="standard-basic"
              label="Configuration"
              margin="normal"
              variant="outlined"
              onChange={(event) => {
                configurationChangeHandler(event, 'text field');
              }}
            />
        )}
      />
    </Container>
  )
}