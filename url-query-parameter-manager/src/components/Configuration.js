import React, {useRef} from 'react';

import {Container, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const Configuration = (props) => {
  const { configurationChangeHandler } = props;
  const inputelement = useRef(null)
  return (
    <Container>
      <h2>Configuration name</h2>

        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={props.configurationOptions}
          onChange={(event) => {
            console.log(inputelement, 'INPUT ELEMENT');
            event.target = inputelement.current;
            props.configurationChangeHandler(event);
          }}
          onSubmit={(event) => {
            event.preventDefault();
            console.log('The event in submit', event)
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              inputRef={inputelement}
              onSubmit={(event) => {
                event.preventDefault();
                console.log('The event in submit', event)
              }}
              onChange={configurationChangeHandler}
              id="standard-basic"
              label="Configuration"
              margin="normal"
              variant="outlined"
            />
        )}
      />


    </Container>
  )
}