import React from "react";
import { Route, Link as RouterLink } from 'react-router-dom';
import ParameterLayout from './components/pages/ParameterLayout';
import StoredConfigurationLayout from './components/pages/StoredConfigurationLayout';
import ImportLayout from './components/pages/ImportLayout';
import ConfigurationManagementLayout from './components/pages/ConfigurationManagementLayout';
import { Container, Button } from "@material-ui/core";
import './App.css';


const App = () => {

  return (
    <Container>
      <div className="navContainer">
      <Button className="btn" color="primary" component={RouterLink} to="/">
        Parameters
      </Button>
      <Button className="btn" color="primary" component={RouterLink} to="/config">
        Stored Keys {`&`} Values
      </Button>
      <Button className="btn" color="primary" component={RouterLink} to="/import">
        Import
      </Button>
      <Button className="btn" color="primary" component={RouterLink} to="/manage">
        Manage Configuration
      </Button>
      </div>

      <Route exact path="/import" component={ImportLayout}/>
      <Route exact path="/config" component={StoredConfigurationLayout}/>
      <Route exact path="/manage" component={ConfigurationManagementLayout}/>
      <Route exact path="/" component={ParameterLayout}/>
    </Container>
  )

  
};

export default App;
