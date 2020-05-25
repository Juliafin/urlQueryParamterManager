export const setUrl = (queryString, url) => {

  const script = `history.replaceState("", "", "${url}${queryString}")`

  window.chrome.tabs.executeScript(null, {code: script});
}