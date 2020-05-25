import React from 'react';
import { TextField, Container, Grid } from '@material-ui/core';
import './ParamsDisplay.css';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';

export const ParamsDisplay = ({ queryFieldOnChangeHandler, queryFieldOnDeleteHandler, queryFields}) => {

  const queryFieldElements = queryFields
    .map((field) => {
      const {key, value, id} = field;
      const keyId = `key-${id}`;
      const valueId = `value-${id}`;
      const buttonId = `button-${id}`;
      return (
        <div className="flex">
          <TextField
            onChange={queryFieldOnChangeHandler}
            label={key}
            className="key"
            name={keyId}
            id={keyId}
            value={key}
          />
          <TextField
            label={value}
            onChange={queryFieldOnChangeHandler}
            id={valueId}
            name={valueId}
            value={value}
          />
          <div 
            className="flex"
            onClick={queryFieldOnDeleteHandler}
            id={buttonId}
            >
            <RemoveCircleRoundedIcon className="icon removeCircle"/>
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