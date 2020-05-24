import React from 'react';
import './App.css';
import { Configuration } from './components/Configuration';
import { ParamsDisplay } from './components/ParamsDisplay';
import { getCurrentUrl, parseUrlParams } from './utils/parseUrl';
import { setUrl } from './utils/setUrl';
import { createQueryString } from './utils/createQueryString';
import { getConfiguration, saveConfiguration } from './utils/configurationUtils'
import cloneDeep  from 'lodash.clonedeep';
import { Container, Button } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const defaultFields = {key: "name", value: "value", id: 1};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      tabId: '',
      queryFields: [defaultFields],
      currentConfiguration: '',
      configurations: {}
    }
  }

  async componentDidMount() {
    const {currentUrl: url, tabId} = await getCurrentUrl();
    const { configurations } = await getConfiguration();
    const queryFields = parseUrlParams(url);
    this.setState({
      configurations,
      url,
      queryFields: queryFields.length ? queryFields : this.state.queryFields,
      tabId
    });
  }

  queryFieldOnDeleteHandler = (event) => {

    const { id } = event.currentTarget;
    let index = parseInt(id.split('-')[1], 10) - 1;
    let newQueryFields = cloneDeep(this.state.queryFields);
    newQueryFields.splice(index, 1);

    newQueryFields = newQueryFields.map((field, index) => {
      return {...field, id: index + 1}
    })

    this.setState({queryFields: newQueryFields});

  };

  queryFieldOnChangeHandler = (event) => {

    const { id, value } = event.target;
    let newQueryFields = cloneDeep(this.state.queryFields);
    const index = parseInt(id.split('-')[1], 10) - 1;
    if (id.startsWith("key")) {
      newQueryFields[index].key = value;
    } else if (id.startsWith("value")) {
      newQueryFields[index].value = value;
    }

    this.setState({queryFields: newQueryFields});
  };

  setUrlHandler = (event) => {
    const queryString = createQueryString(this.state.queryFields);
    setUrl(queryString)
  }

  queryFieldOnAddHandler = (event) => {
    let fieldsToAdd = [];
    if (!this.state.queryFields || !this.state.queryFields.length) {
      fieldsToAdd.push(defaultFields);
    } else {
      const lastIndex = this.state.queryFields.length - 1;
      fieldsToAdd = [...cloneDeep(this.state.queryFields), {...defaultFields, ...{id: this.state.queryFields[lastIndex].id} }]
    }
    fieldsToAdd = fieldsToAdd.map((field, index) => {
      return {...field, id: index + 1}
    })

    console.log(fieldsToAdd, 'fields on add');

    this.setState({queryFields: fieldsToAdd});
  }

  onConfigurationChangeHandler = (event) => {
    console.log(event, 'event: ')
    const configurationName = event.target.value;
    console.log('configuration: ', configurationName);
    const configuration = this.state.configurations[configurationName] || this.state.queryFields;
    this.setState({currentConfiguration: configurationName, queryFields: configuration});
    console.log('state after setting configuration', this.state);
  }

  saveConfigurationHandler = async(event) => {
    console.log('Saving configuration');
    console.log(this.state);
    const configurations = await saveConfiguration(this.state.currentConfiguration, this.state.queryFields);
    this.setState({configurations});
  }


  render() {

    return (
      <div className="App">
        <h1>Url Query Parameter Manager</h1>
        <p>Current url: {this.state.url}</p>
        <Configuration
          currentConfiguration={this.state.currentConfiguration}
          configurationChangeHandler={this.onConfigurationChangeHandler}
          configurationOptions={Object.keys(this.state.configurations)}
        />
        <ParamsDisplay 
          queryFieldOnChangeHandler={this.queryFieldOnChangeHandler}
          queryFields={this.state.queryFields}
          queryFieldOnDeleteHandler={this.queryFieldOnDeleteHandler}/
        >
        <Container 
          className="flex addContainer"
          onClick={this.queryFieldOnAddHandler}
          >
          <AddCircleOutlineRoundedIcon className="addCircle"/>
        </Container>

        <Button onClick={this.setUrlHandler}>Set Url</Button>
        <Button
          onClick={this.saveConfigurationHandler}>Save Configuration</Button>
      </div>
    );
  }
}

export default App;
