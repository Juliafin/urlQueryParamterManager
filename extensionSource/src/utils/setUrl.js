export const setUrl = (url) => {



  const script = `history.replaceState("", "", "${url}")`

  window.chrome.tabs.executeScript(null, {code: script});
}