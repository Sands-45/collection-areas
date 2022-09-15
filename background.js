try {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
      chrome.scripting?.executeScript({
        files: ["content-script.js"],
        target: { tabId: tab.id },
      });
  setInterval(() => {
    chrome.runtime?.onMessage.addListener(function (
      request
    ) {
      chrome.runtime.sendMessage(request);
    });
  }, 30000);
    }
  });
} catch (e) {
  console.log(e);
}
