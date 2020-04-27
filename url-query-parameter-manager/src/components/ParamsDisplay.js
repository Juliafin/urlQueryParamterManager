import React from 'react';
import { TextField, Container, Grid } from '@material-ui/core';
import './ParamsDisplay.css';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import { v4 as uuidv4 } from 'uuid';

export const ParamsDisplay = ({ queryFieldOnChangeHandler, queryFieldOnDeleteHandler, queryFields}) => {

  const queryFieldElements = queryFields
    .map((field, index) => {
      const {key, value, id} = field;
      const keyId = `key-${id}`;
      const valueId = `value-${id}`;
      const buttonId = `button-${id}`;
      return (
        <div key={uuidv4()} className="flex">
          <TextField
            onChange={queryFieldOnChangeHandler}
            label={key}
            className="key"
            name={keyId}
            id={keyId}
            key={uuidv4()}
          />
          <TextField
            label={value}
            onChange={queryFieldOnChangeHandler}
            id={valueId}
            name={valueId}
            key={uuidv4()}
          />
          <div 
            className="flex"
            onClick={queryFieldOnDeleteHandler}
            id={buttonId}
            key={uuidv4()}
            >
            <RemoveCircleRoundedIcon className="removeCircle"/>
          </div>
        </div>
      );

    });

    return (
      <Container id="paramsDisplay">

        <Grid
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {queryFieldElements}
        </Grid>
      </Container>
    )
}