import React from "react";
import { Route, Link as RouterLink } from 'react-router-dom';
import ConfigurationLayout from './components/pages/ConfigurationLayout';
import { Container, Button } from "@material-ui/core";


const App = () => {

  return (
    <Container>
      <div>
      <Button color="primary" component={RouterLink} to="/">
        Parameters
      </Button>
      <Button color="primary" component={RouterLink} to="/config">
        Configuration
      </Button>
      </div>

      <Route exact path="/config" render={() => {
        return (

          <div>
            <p>Config!</p>
        </div>
          )
      }}  />
      <Route exact path="/" component={ConfigurationLayout}/>
    </Container>
  )

  
};

export default App;
