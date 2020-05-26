import React from 'react';
import { ManagerContext } from '../../store/URLManagerContext';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const StoredConfigurationLayout = () => {

  const {
    configurations,
    keyHistory
  } = React.useContext(ManagerContext)

  console.log(keyHistory, 'KEY HISTORY IN LAYOUT');

  const savedKeys = Object.keys(keyHistory).map((key, index) => {
    return (
      <ListItem id={index} key={index}>

        <ListItemText primary={key}/>
        <Divider/>w
      </ListItem>
    )
  })


  return (
    <List component="nav" className="savedKeyList">
      {savedKeys}
    </List>
  )

}


export default StoredConfigurationLayout;