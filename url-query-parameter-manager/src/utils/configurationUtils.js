export const saveConfiguration = async (configurationName, configToSave) => {

  let { configurations } = await getConfiguration() || {};
  console.log(configurations)

  configurations[configurationName] = configToSave;

  console.log('configurations to save', configurations);
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.set( {configurations} , () => {
      console.log('Configuration has been saved')
      resolve(configurations);
    } )
  });

}

export const getConfiguration = () => {
  return new Promise((resolve, reject) => {
  window.chrome.storage.sync.get(["configurations"], (configs) => {
    // console.log(configs);
    resolve(configs);
  });

  })
}