import React from 'react';
import { TextField, Container, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import './ParamsDisplay.css';

export const ParamsDisplay = ({ queryFieldOnChangeHandler, queryFieldOnDeleteHandler, queryFields, keyHistory}) => {

  const queryFieldElements = queryFields
    .map((field) => {
      const {key, value, id} = field;
      const keyId = `key-${id}`;
      const valueId = `value-${id}`;
      const buttonId = `button-${id}`;
      const autoCompleteID = `key-autocomplete-${id}`
      return (
        <div className="flex">
          <Autocomplete
            id={autoCompleteID}
            freeSolo
            options={Object.keys(keyHistory)}
            onChange={(event, keyValue) => {
              console.log('VALUE IN AUTO COMPLETE', keyValue)
              queryFieldOnChangeHandler({target: {value: keyValue, id: keyId}}, keyValue)
            }}
            renderInput={(props) => (
              <TextField
                {...props}
                onChange={queryFieldOnChangeHandler}
                label={key}
                className="key"
                name={keyId}
                id={keyId}
                value={key}
              />
          )}
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