export const setUrl = (queryString) => {

  const script = `history.replaceState("", "", "${window.location.pathname}/${queryString}")`

  window.chrome.tabs.executeScript(null, {code: script});
}