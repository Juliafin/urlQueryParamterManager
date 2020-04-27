var name = "abcdef"
chrome.runtime.onInstalled.addListener(() => {
  
  console.log('hello there!');
  
  console.log('WINDOW: ', window);
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules(
      [
        {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { schemes: ['https', 'http']},
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

const storeCurrentUrl = (url, tabId) => {
  chrome.storage.sync.set({currentUrl: url, tabId}, function() {
    console.log("The url stored: ", url);
  });
}

const getCurrentTabUrl = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
    console.log('TAB!', tab);
    const url = tab[0].url;
    console.log('current url: ', url);
    storeCurrentUrl(url, tab[0].id);
    
  });
}


chrome.webNavigation.onCompleted.addListener((tab) => {
  if (tab.tabId) {
    chrome.webNavigation.getFrame({frameId: 0, tabId: tab.tabId}, (details) => {
      console.log('Details: ', details);
      console.log('Url', details.url);
      storeCurrentUrl(details.url, tab.tabId);
    })
  }
  // getCurrentTabUrl();
})

chrome.tabs.onActiveChanged.addListener((nav) => {
  // console.log('URL:', url);
  console.log('nav', nav);
  

  getCurrentTabUrl();
});

