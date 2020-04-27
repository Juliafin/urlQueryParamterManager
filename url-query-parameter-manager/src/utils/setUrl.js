export const setUrl = (queryString, tabId) => {

  const script = `history.replaceState("", "", "/${queryString}")`

  window.chrome.tabs.executeScript(tabId, script);
}