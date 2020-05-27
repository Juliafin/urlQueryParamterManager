import React from 'react';
import { ManagerContext } from '../../store/URLManagerContext';
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import "./storedConfigurationLayout.css";

const StoredConfigurationLayout = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [selectedKey, setSelectedKey] = React.useState("");

  const [selectedValueIndex, setSelectedValueIndex] = React.useState(-1)
  const [selectedValue, setSelectedValue] = React.useState("");

  const [addKeyInputValue, setAddKeyInputValue] = React.useState("");
  const [addValueInputValue, setAddValueInputValue] = React.useState("");


  const handleListKeyItemClick = (event, index, key) => {
    setSelectedIndex(index);
    setSelectedKey(key);
  };

  const handleListValueItemClick = (event, index, value) => {
    setSelectedValueIndex(index);
    setSelectedValue(value);
  }
  

  const {
    configurations,
    handlers,
    keyHistory
  } = React.useContext(ManagerContext)


  const savedKeys = Object.keys(keyHistory).map((key, index) => {
    return (
      <Container>
        <ListItem
          key={index}
          button
          selected={selectedIndex === index}
          onClick={(event) => handleListKeyItemClick(event, index, key)}
          className="" dense id={index} key={index}>
          <ListItemText primary={key}/>
          <IconButton edge="end" aria-label="delete">
              <DeleteIcon onClick={(event) => {
                handlers.deleteStoredKeyHistoryHandler(key);
              }}/>
          </IconButton>
        </ListItem>
        <Divider/>
      </Container>
    )
  })

  const doValuesExist = selectedKey && keyHistory[selectedKey] && keyHistory[selectedKey].length;

  const storedValues = doValuesExist ? keyHistory[selectedKey].map((value, valueIndex) => {
    return (
      <Container>
        <ListItem
          key={valueIndex}
          button
          selected={selectedValueIndex === valueIndex}
          onClick={(event) => handleListValueItemClick(event, valueIndex, value)}
          className="" dense id={valueIndex} key={valueIndex}>
          <ListItemText primary={value}/>
          <IconButton edge="end" aria-label="delete">
              <DeleteIcon onClick={(event) => {
                handlers.deleteStoredKeyHistoryValueHandler(value, selectedKey)
              }}/>
          </IconButton>
        </ListItem>
        <Divider/>
      </Container>
    )
  }) : null;


  const addAKeyField = <TextField
    label="Add a key"
    className="addAKeyField"
    name="addAKeyField"
    margin="normal"
    placeholder="Key"
    value={addKeyInputValue}
    onChange={(event) => {
      const {value} = event.target;
      setAddKeyInputValue(value);
    }}
    InputLabelProps={{
      shrink: true,
    }}
  />

  const addAValueField = <TextField
    label="Add a value"
    className="addAValueField"
    name="addAValueField"
    margin="normal"
    placeholder="value"
    value={addValueInputValue}
    onChange={(event) => {
      const {value} = event.target;
      setAddValueInputValue(value);
    }}
    InputLabelProps={{
      shrink: true,
    }}
/>

  return (
    <Container className="keyHistoryContainer">
      <Typography className="storedKeysHeader" variant="h6" >Stored Keys</Typography>
      <List dense="true" component="div" className="savedKeyList">

      <Container className="addAKeyContainer">
        {addAKeyField}
        <IconButton
          onClick={() => {
            if (!keyHistory[addKeyInputValue]) {
              handlers.addNewKeyHistoryKey(addKeyInputValue);
              // Clear the input if it's successful
              setAddKeyInputValue("");
            }
          }}
          edge="end">
          <AddCircleOutlineRoundedIcon className="icon addCircle"/>
        </IconButton>
      </Container>
        {savedKeys}
      </List>
      <Typography className="storedValuesHeader" variant="h6" >Stored Values</Typography>
      <List dense="true" component="div" className="savedKeyList">
      <Container className="addAKeyContainer">
        {addAValueField}
        <IconButton
          disabled={!selectedKey}
          onClick={() => {
            if (!keyHistory[selectedKey].includes(addValueInputValue)) {
              handlers.addNewValueToHistoryKey(addValueInputValue, selectedKey);
              // Clear the input if it's successful
              setAddValueInputValue("");
            }
          }}
          edge="end">
          <AddCircleOutlineRoundedIcon className="icon addCircle"/>
        </IconButton>
      </Container>
        {storedValues}
      </List>


    </Container>
  )

}


export default StoredConfigurationLayout;