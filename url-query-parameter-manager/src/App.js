import React from "react";
import "./App.css";
import { Configuration } from "./components/Configuration";
import { ParamsDisplay } from "./components/ParamsDisplay";
import { getCurrentUrl, parseUrlParams } from "./utils/parseUrl";
import { setUrl } from "./utils/setUrl";
import { createQueryString } from "./utils/createQueryString";
import {
  getConfiguration,
  saveConfiguration,
  getKeyHistory,
  setKeyHistory,
} from "./utils/configurationUtils";
import cloneDeep from "lodash.clonedeep";
import { Container, Button } from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

const defaultFields = { key: "name", value: "value", id: 1 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      tabId: "",
      queryFields: [defaultFields],
      currentConfiguration: "",
      configurations: {},
      keyHistory: {},
    };
  }

  async componentDidMount() {
    const { currentUrl: url, tabId } = await getCurrentUrl();
    const { configurations } = await getConfiguration();
    const { keyHistory } = await getKeyHistory();
    console.log("key history in mount", keyHistory);
    const queryFields = parseUrlParams(url);
    this.setState({
      configurations,
      keyHistory,
      queryFields: queryFields.length ? queryFields : this.state.queryFields,
      tabId,
      url,
    });
  }

  queryFieldOnDeleteHandler = (event) => {
    const { id } = event.currentTarget;
    let index = parseInt(id.split("-")[1], 10) - 1;
    let newQueryFields = cloneDeep(this.state.queryFields);
    newQueryFields.splice(index, 1);

    newQueryFields = newQueryFields.map((field, index) => {
      return { ...field, id: index + 1 };
    });

    this.setState({ queryFields: newQueryFields });
  };

  queryFieldOnChangeHandler = (event, fieldValue) => {
    const { id, value } = event.target;
    let newQueryFields = cloneDeep(this.state.queryFields);
    const idArray = id.split("-");
    const index = parseInt(idArray[idArray.length - 1], 10) - 1;
    if (id.startsWith("key")) {
      newQueryFields[index].key = value;
    } else if (id.startsWith("value")) {
      newQueryFields[index].value = value;
    }

    this.setState({ queryFields: newQueryFields });
  };

  setUrlHandler = (event) => {
    const queryString = createQueryString(this.state.queryFields);
    const url = this.state.url.replace(/(.*)(\?.*)/, "$1");
    setUrl(queryString, url);
  };

  queryFieldOnAddHandler = (event) => {
    let fieldsToAdd = [];
    if (!this.state.queryFields || !this.state.queryFields.length) {
      fieldsToAdd.push(defaultFields);
    } else {
      const lastIndex = this.state.queryFields.length - 1;
      fieldsToAdd = [
        ...cloneDeep(this.state.queryFields),
        { ...defaultFields, ...{ id: this.state.queryFields[lastIndex].id } },
      ];
    }
    fieldsToAdd = fieldsToAdd.map((field, index) => {
      return { ...field, id: index + 1 };
    });
    this.setState({ queryFields: fieldsToAdd });
  };

  onConfigurationChangeHandler = (event) => {
    const configurationName = event.target.value;
    const configuration =
      this.state.configurations[configurationName] || this.state.queryFields;
    this.setState(
      { currentConfiguration: configurationName, queryFields: configuration },
      () => {}
    );
  };

  saveConfigurationHandler = async (event) => {
    const configurations = await saveConfiguration(
      this.state.currentConfiguration,
      this.state.queryFields
    );

    const keys = await setKeyHistory(this.state.queryFields);
    console.log(keys, "KEYS IN SAVE CONFIGURATION");
    this.setState({ configurations, keyHistory: keys }, () => {});
  };

  render() {
    const isConfigurationButtonDisabled = !Boolean(
      this.state.currentConfiguration
    );
    return (
      <div className="App">
        <h1>Url Query Parameter Manager</h1>
        <p>Current url: {this.state.url}</p>
        <Configuration
          configurationChangeHandler={this.onConfigurationChangeHandler}
          configurationOptions={Object.keys(this.state.configurations)}
        />
        <ParamsDisplay
          queryFieldOnChangeHandler={this.queryFieldOnChangeHandler}
          queryFields={this.state.queryFields}
          queryFieldOnDeleteHandler={this.queryFieldOnDeleteHandler}
          keyHistory={this.state.keyHistory}
        />
        <Container
          className="flex addContainer"
          onClick={this.queryFieldOnAddHandler}
        >
          <AddCircleOutlineRoundedIcon className="icon addCircle" />
        </Container>

        <Container className="configurationButtonContainer">
          <Button
            className="configurationButton"
            onClick={this.setUrlHandler}
            variant="outlined"
          >
            Set Url
          </Button>
          <Button
            className="configurationButton"
            onClick={this.saveConfigurationHandler}
            disabled={isConfigurationButtonDisabled}
            variant="outlined"
          >
            Save Configuration
          </Button>
        </Container>
      </div>
    );
  }
}

export default App;
