import React from "react";
import { Route, Link as RouterLink } from 'react-router-dom';
import ParameterLayout from './components/pages/ParameterLayout';
import StoredConfigurationLayout from './components/pages/StoredConfigurationLayout';
import { Container, Button } from "@material-ui/core";


const App = () => {

  return (
    <Container className="navContainer">
      <div>
      <Button color="primary" component={RouterLink} to="/">
        Parameters
      </Button>
      <Button color="primary" component={RouterLink} to="/config">
        Configuration
      </Button>
      </div>

      <Route exact path="/config" component={StoredConfigurationLayout}/>
      <Route exact path="/" component={ParameterLayout}/>
    </Container>
  )

  
};

export default App;
