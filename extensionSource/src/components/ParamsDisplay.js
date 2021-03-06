import React from "react";
import { TextField, Container, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { IconButton } from '@material-ui/core';
import "./ParamsDisplay.css";

export const ParamsDisplay = ({
  queryFieldOnChangeHandler,
  queryFieldOnDeleteHandler,
  queryFields,
  keyHistory,
}) => {
  console.log(queryFields, 'query fields');
  const queryFieldElements = queryFields.map((field, index) => {

    let autoFocus = index ? true : false;

    let { key, value, id } = field;
    key = decodeURI(key);
    const keyId = `key-${id}`;
    const valueId = `value-${id}`;
    const buttonId = `button-${id}`;
    const autoCompleteID = `key-autocomplete-${id}`;
    const autoCompleteValueID = `value-autocomplete-${id}`;
    console.log(key, keyHistory, 'key and keyhistory')
    console.log('OPTIONS!!!', keyHistory[key]);
    return (
      <div key={index} className="flex">
        <Autocomplete
          className="paramFieldContainer"
          id={autoCompleteID}
          freeSolo
          options={Object.keys(keyHistory)}
          onChange={(event, keyValue) => {
            queryFieldOnChangeHandler(
              { target: { value: keyValue, id: keyId } },
              keyValue
            );
          }}
          inputValue={key || ''}
          renderInput={(props) => (
            <TextField
              {...props}
              autoFocus={autoFocus}
              onChange={queryFieldOnChangeHandler}
              InputLabelProps={{
                shrink: true,
              }}
              label={`key ${index + 1}`}
              className="key"
              name={keyId}
              id={keyId}
              value={key}
              margin="dense"
              size="small"
            />
          )}
        />
        <Autocomplete
          className="valueFieldContainer"
          id={autoCompleteValueID}
          freeSolo
          options={keyHistory[key] || []}
          onChange={(event, keyValue) => {
            queryFieldOnChangeHandler(
              { target: { value: keyValue, id: valueId } },
              keyValue
            );
          }}
          inputValue={value || ''}
          renderInput={(props) => (
            <TextField
              {...props}
              onChange={queryFieldOnChangeHandler}
              InputLabelProps={{
                shrink: true,
              }}
              label={`value ${index + 1}`}
              className="key"
              name={valueId}
              id={valueId}
              value={value}
              margin="dense"
              size="small"
            />
          )}
        />
        <div className="flex" onClick={queryFieldOnDeleteHandler} id={buttonId}>
        <IconButton edge="end" aria-label="removeParam">
          <RemoveCircleRoundedIcon className="icon removeCircle" />
        </IconButton>
        </div>
      </div>
    );
  });

  return (
    <Container id="paramsDisplay">
      <Grid direction="row" justify="space-around" alignItems="center">
        {queryFieldElements}
      </Grid>
    </Container>
  );
};
