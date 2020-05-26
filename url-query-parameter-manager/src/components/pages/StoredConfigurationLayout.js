import React from 'react';
import { ManagerContext } from '../../store/URLManagerContext';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import "./storedConfigurationLayout.css";

const StoredConfigurationLayout = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [selectedKey, setSelectedKey] = React.useState("");

  const [selectedValueIndex, setSelectedValueIndex] = React.useState(-1)
  const [selectedValue, setSelectedValue] = React.useState("");


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

  console.log(keyHistory, 'KEY HISTORY IN LAYOUT');

  const savedKeys = Object.keys(keyHistory).map((key, index) => {
    return (
      <Container>
        <ListItem
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
          button
          selected={selectedValueIndex === valueIndex}
          onClick={(event) => handleListValueItemClick(event, valueIndex, value)}
          className="" dense id={valueIndex} key={valueIndex}>
          <ListItemText primary={value}/>
          <IconButton edge="end" aria-label="delete">
              <DeleteIcon onClick={(event) => {
                console.log('Delete clicked, valueIndex: ', valueIndex)
                console.log('current value: ', value);
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
    InputLabelProps={{
      shrink: true,
    }}
  />

  return (
    <Container className="keyHistoryContainer">
      <Typography className="storedKeysHeader" variant="h6" >Stored Keys</Typography>
      <List dense="true" component="div" className="savedKeyList">
        <ListSubheader>
          <Container className="addAKeyContainer">
            {addAKeyField}
          </Container>
        </ListSubheader>
        {savedKeys}
      </List>
      <Typography className="storedValuesHeader" variant="h6" >Stored Values</Typography>
      <List dense="true" component="div" className="savedKeyList">
        {storedValues}
      </List>


    </Container>
  )

}


export default StoredConfigurationLayout;