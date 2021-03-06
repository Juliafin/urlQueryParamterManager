import React from "react";
import { getCurrentUrl, parseUrlParams } from "../utils/parseUrl";
import { setUrl } from "../utils/setUrl";
import { createQueryString } from "../utils/createQueryString";
import {
  getConfiguration,
  saveConfiguration,
  setConfigurations,
  getKeyHistory,
  saveKeyHistory,
  setKeyHistory,
} from "../utils/configurationUtils";
import cloneDeep from "lodash.clonedeep";

export const ManagerContext = React.createContext();

const defaultFields = { key: "", value: "", id: 1 };

export class UrlManagerContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      newUrl: "",
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
      configurations: configurations || {},
      keyHistory: keyHistory || {},
      queryFields: queryFields.length ? queryFields : this.state.queryFields,
      tabId,
      newUrl: url || '',
      url: url || '',
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

    this.setState({ queryFields: newQueryFields } ,() => {
      this.setNewUrl();
    });
  };

  queryFieldOnChangeHandler = (event, fieldValue) => {
    const { id, value } = event.target;
    let newQueryFields = cloneDeep(this.state.queryFields);
    const idArray = id && id.split("-");
    const index = parseInt(idArray[idArray.length - 1], 10) - 1;
    if (id.startsWith("key")) {
      newQueryFields[index].key = value;
    } else if (id.startsWith("value")) {
      newQueryFields[index].value = value;
    }

    this.setState({ queryFields: newQueryFields }, () => {
      this.setNewUrl();
    });
  };

  setNewUrl = () => {
    const queryString = createQueryString(this.state.queryFields);
    const url = this.state.url.replace(/(.*)(\?.*)/, "$1");
    const newUrl = `${url}${queryString}`;
    this.setState({newUrl})
  }

  setUrlHandler = (event, url) => {
    console.log('NEW URL', encodeURI(this.state.newUrl));
    setUrl(encodeURI(url));
  };

  goToUrlHandler = (event, url) => {
    window.chrome.tabs.update(this.state.tabId, {
      url: this.state.newUrl
    })
    window.close();
  }

  queryFieldOnAddHandler = (event) => {
    let fieldsToAdd = [];
    if (!this.state.queryFields || !this.state.queryFields.length) {
      fieldsToAdd.push(defaultFields);
    } else {
      const lastIndex = this.state.queryFields.length - 1;
      fieldsToAdd = [
        ...cloneDeep(this.state.queryFields),
        { key:"", value: "", ...{ id: this.state.queryFields[lastIndex].id } },
      ];
    }
    fieldsToAdd = fieldsToAdd.map((field, index) => {
      return { ...field, id: index + 1 };
    });
    this.setState({ queryFields: fieldsToAdd }, () => {
      this.setNewUrl();
    });
  };

  onConfigurationChangeHandler = (event) => {
    const configurationName = event.target.value;
    const configuration =
      this.state.configurations[configurationName] || this.state.queryFields;
    this.setState(
      { currentConfiguration: configurationName, queryFields: configuration },
      () => {
        this.setNewUrl();
      }
    );
  };

  saveConfigurationHandler = async (event) => {
    const configurations = await saveConfiguration(
      this.state.currentConfiguration,
      this.state.queryFields
    );
    console.log('current state', this.state);
    console.log('Current configuration in handler', this.state.currentConfiguration);
    console.log('queryFields to save in handler: ', this.state.queryFields);
    console.log('Configurations in configuration handler', configurations);

    const keys = await setKeyHistory(this.state.queryFields)
    console.log('keys in configuration handler', keys );
    this.setState({ configurations, keyHistory: keys }, () => {});
  };

  deleteStoredKeyHistoryHandler = async (keyToDelete) => {
    const keyHistory = cloneDeep(this.state.keyHistory);
    delete keyHistory[keyToDelete];
    this.setState({keyHistory});
    await saveKeyHistory(keyHistory);
  }

  deleteAllKeyHistoryHandler = async () => {
    this.setState({keyHistory: {}});
    await saveKeyHistory({})
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

  importKeyHistoryHandler = async(importedJson) => {

    const keyHistory = cloneDeep(this.state.keyHistory);

    Object.keys(importedJson).forEach((key) => {
      
      const values = importedJson[key];
      // Validate that the key refers to an array
      if (!Array.isArray(values)) {
        throw new Error('Imported JSON is formatted improperly. The key must refer to an array of strings.')
      }

      // Validate the all values in the array are strings for consistency
      const areAllValuesStrings = values.every((k) => {
        return typeof k === 'string';
      });


      if (!areAllValuesStrings) {
        throw new Error('Imported JSON is formatted improperly. All keys are not strings.')
      }

      // If the key does not exist, simply write the array into the keyHistory otherwise loop through and check if each value already exists
      if (!keyHistory[key]) {
        keyHistory[key] = values.sort();
      } else {
        values.forEach((val) => {
          if (!keyHistory[key].includes(val)) {
            keyHistory[key].push(val)
          }
        })
        
        keyHistory[key] = keyHistory[key].sort();
      }

    })

    this.setState({keyHistory});
    await saveKeyHistory(keyHistory);
  }

  addNewKeyHistoryKey = async(newKeyToadd) => {
    const keyHistory = cloneDeep(this.state.keyHistory);
    keyHistory[newKeyToadd] = [];
    this.setState({keyHistory});
    await saveKeyHistory(keyHistory);
  }

  addNewValueToHistoryKey = async(newValueToadd, selectedKey) => {
    const keyHistory = cloneDeep(this.state.keyHistory);
    keyHistory[selectedKey].push(newValueToadd);
    this.setState({keyHistory});
    await saveKeyHistory(keyHistory);

  }
  
  addConfigurationsHandler = async(configurationsToAdd) => {
    const configurations = cloneDeep(this.state.configurations);

    Object.keys(configurationsToAdd).forEach((config) => {

      configurationsToAdd[config].forEach((configFields) => {

      // Check if an id key and value exist!

        const {id, key, value} = configFields;
        if (!id || !key || !value || !typeof id === 'number' || !typeof key === 'string' || !typeof value === 'string') {
          console.log('Error processing json');
          throw new Error('Configurations are improperly formatted and must include an id, key and value with the correct types');
        }
      })

      configurations[config] = configurationsToAdd[config];
    })

    await setConfigurations(configurations);
    this.setState({configurations});
  }

  deleteConfigurationItemHandler = async(configurationToDelete) => {
    const configurations = cloneDeep(this.state.configurations);
    delete configurations[configurationToDelete];
    await setConfigurations(configurations);
    this.setState({configurations});
  }

  deleteAllConfigurations = async() => {
    await setConfigurations({});
    this.setState({configurations: {}})
  }

  render() {
    const { children } = this.props;

    return (
      <ManagerContext.Provider
        value={{
          handlers: {
            addNewKeyHistoryKey: this.addNewKeyHistoryKey,
            addNewValueToHistoryKey: this.addNewValueToHistoryKey,
            addConfigurationsHandler: this.addConfigurationsHandler,
            deleteStoredKeyHistoryHandler: this.deleteStoredKeyHistoryHandler,
            deleteStoredKeyHistoryValueHandler: this.deleteStoredKeyHistoryValueHandler,
            deleteConfigurationItemHandler: this.deleteConfigurationItemHandler,
            deleteAllKeyHistoryHandler: this.deleteAllKeyHistoryHandler,
            deleteAllConfigurations: this.deleteAllConfigurations,
            goToUrlHandler: this.goToUrlHandler,
            importKeyHistoryHandler: this.importKeyHistoryHandler,
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
          newUrl: this.state.newUrl,
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
