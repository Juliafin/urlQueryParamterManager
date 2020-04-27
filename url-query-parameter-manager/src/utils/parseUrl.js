export const parseUrlParams = (url) => {
  const queryString = url.split('?');
  const params = queryString && queryString[1] ? queryString[1]
    .split('&')
    .map((keyPair, index) => {
      keyPair = keyPair.split('=')
      const key = keyPair[0];
      const value = keyPair[1];
      return {key, value, id: index + 1};
    }) : []
    return params;
};


export const getCurrentUrl = () => {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get(["currentUrl", "tabId"], (result) => {
      console.log('THE STORED KEY', result);
      if (result) {
        resolve({currentUrl: result.currentUrl, tabId: result.tabId })
      } else {
        resolve("No url");
      } 
    })
  })
}

