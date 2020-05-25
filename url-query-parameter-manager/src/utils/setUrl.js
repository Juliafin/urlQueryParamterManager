export const setUrl = (queryString) => {

  const script = `history.replaceState("", "", "${window.location.href..replace(/(.*)(\?.*)/, "$1")}/${queryString}")`

  window.chrome.tabs.executeScript(null, {code: script});
}