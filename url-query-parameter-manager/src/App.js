import React from 'react';
import './App.css';
import { Profile } from './components/Profile';
import { ParamsDisplay } from './components/ParamsDisplay';
import { getCurrentUrl, parseUrlParams } from './utils/parseUrl';
import cloneDeep  from 'lodash.clonedeep';
import { Container } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const defaultFields = {key: "name", value: "value", id: 1};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      tabId: '',
      queryFields: [defaultFields]
    }
  }

  async componentDidMount() {
    const {currentUrl: url, tabId} = await getCurrentUrl();
    const queryFields = parseUrlParams(url);
    this.setState({url, queryFields: queryFields.length ? queryFields : this.state.queryFields, tabId});
  }

  // async componentDidUpdate() {
  //   const url = await getCurrentUrl();
  //   this.setState({url});
  // }

  queryFieldOnDeleteHandler = (event) => {

    const { id } = event.currentTarget;
    let index = parseInt(id.split('-')[1], 10) - 1;
    let newQueryFields = cloneDeep(this.state.queryFields);
    newQueryFields.splice(index, 1);

    newQueryFields = newQueryFields.map((field, index) => {
      return {...field, id: index + 1}
    })

    console.log(newQueryFields, 'Fields on delete');
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


  render() {
    return (
      <div className="App">
        <h1>Url Query Parameter Manager</h1>
        <p>Current url: {this.state.url}</p>
        <Profile/>
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
      </div>
    );
  }
}

export default App;
