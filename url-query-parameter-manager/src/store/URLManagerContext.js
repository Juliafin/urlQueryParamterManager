import React from "react";
import { getCurrentUrl, parseUrlParams } from "../utils/parseUrl";
import { setUrl } from "../utils/setUrl";
import { createQueryString } from "../utils/createQueryString";
import {
  getConfiguration,
  saveConfiguration,
  getKeyHistory,
  saveKeyHistory,
  setKeyHistory,
} from "../utils/configurationUtils";
import cloneDeep from "lodash.clonedeep";

export const ManagerContext = React.createContext();

const defaultFields = { key: "name", value: "value", id: 1 };

export class UrlManagerContextProvider extends React.Component {
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
    this.setState({ configurations, keyHistory: keys }, () => {});
  };

  deleteStoredKeyHistoryHandler = async (keyToDelete) => {
    const keyHistory = cloneDeep(this.state.keyHistory);
    delete keyHistory[keyToDelete];
    this.setState({keyHistory});
    await saveKeyHistory(keyHistory);
  }

  deleteStoredKeyHistoryValueHandler = async (valuetoDelete, key) => {
    const keyHistory = cloneDeep(this.state.keyHistory);
    const valueIndex = keyHistory[key] && keyHistory[key].indexOf(valuetoDelete);
    if (valueIndex !== -1) {
      keyHistory[key].splice(valueIndex, 1);
    }
    this.setState({keyHistory});
    await saveKeyHistory(keyHistory);
  }


  render() {
    const { children } = this.props;

    return (
      
      <ManagerContext.Provider
        value={{
          handlers: {
            deleteStoredKeyHistoryHandler: this.deleteStoredKeyHistoryHandler,
            deleteStoredKeyHistoryValueHandler: this.deleteStoredKeyHistoryValueHandler,
            queryFieldOnDeleteHandler: this.queryFieldOnDeleteHandler,
            queryFieldOnChangeHandler: this.queryFieldOnChangeHandler,
            setUrlHandler: this.setUrlHandler,
            queryFieldOnAddHandler: this.queryFieldOnAddHandler,
            onConfigurationChangeHandler: this.onConfigurationChangeHandler,
            saveConfigurationHandler: this.saveConfigurationHandler
          },
          configurations: this.state.configurations,
          currentConfiguration: this.state.currentConfiguration,
          keyHistory: this.state.keyHistory,
          queryFields: this.state.queryFields,
          tabId: this.state.tabId,
          url: this.state.url
        }}
      >
        {children}
      </ManagerContext.Provider>
    )
  }

}

UrlManagerContextProvider.contextType = ManagerContext;
