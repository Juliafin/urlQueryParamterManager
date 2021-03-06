
chrome.runtime.onInstalled.addListener(() => {  

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
    const url = (tab[0] && tab[0].url) || '';
    console.log('current url: ', url);
    storeCurrentUrl(url, tab[0].id);
    
  });
}


chrome.webNavigation.onCompleted.addListener((tab) => {
  if (tab.tabId) {
    chrome.webNavigation.getFrame({frameId: 0, tabId: tab.tabId}, (details) => {
      console.log('navigation completed to new page')
      console.log('Details: ', details);
      if (details) {
        console.log('Url', details.url);
        storeCurrentUrl(details.url, tab.tabId);
      }
      
    })
  }
})

chrome.tabs.onActiveChanged.addListener((nav) => {
  // console.log('URL:', url);
  console.log('active tab changed', nav);
  

  getCurrentTabUrl();
});

chrome.tabs.onActivated.addListener((nav) => {
  // console.log('URL:', url);
  console.log('tab activated', nav);
  

  getCurrentTabUrl();
});


chrome.tabs.onHighlighted.addListener((nav) => {
  // console.log('URL:', url);
  console.log('tab highlighted', nav);
  

  getCurrentTabUrl();

})

chrome.windows.onFocusChanged.addListener((nav) => {
  // console.log('URL:', url);
  console.log('window focus changed', nav);
  

  getCurrentTabUrl();
});
