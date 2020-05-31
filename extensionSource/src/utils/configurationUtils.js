export const saveConfiguration = async (configurationName, configToSave) => {

  let { configurations } = await getConfiguration();

  if (!configurations) {
    configurations = {};
  }

  configurations[configurationName] = configToSave;

  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.set( {configurations} , () => {
      resolve(configurations);
    } )
  });

}

export const setConfigurations = (configurations) => {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.set( {configurations} , () => {
      resolve(configurations);
    } )
  });
}


export const getConfiguration = () => {
  return new Promise((resolve, reject) => {
  window.chrome.storage.sync.get(["configurations"], (configs) => {
    resolve(configs);
  });

  })
}

export const getKeyHistory = () => {
  return new Promise((resolve, reject) => {
  window.chrome.storage.sync.get(["keyHistory"], (keyHistory) => {
    resolve(keyHistory);
  });
  })
}

export const setKeyHistory = async (currentConfig) => {

  let {keyHistory: storedKeyHistory} = await getKeyHistory();

  if (!storedKeyHistory) {
    storedKeyHistory = {}
  }

  currentConfig.forEach(({key, value}) => {
    if (!storedKeyHistory[key]) {
      storedKeyHistory[key] = [value];
    } else {
      if (!storedKeyHistory[key].includes(value)) {
        storedKeyHistory[key] = [...storedKeyHistory[key], value].sort()
      }
    }
  });

  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.set({keyHistory: storedKeyHistory}, (keyHistory) => {
    resolve(storedKeyHistory);
    });
  })
}

export const saveKeyHistory = (keyHistory) => {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.set({keyHistory}, (keyHistory) => {
    resolve(keyHistory);
    });
  })
} 
