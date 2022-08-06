//Initial Script ==================
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["selection"],
  });
});


const dataUrl =
  "https://script.google.com/macros/s/AKfycbwX0v5nRN9H_XmQ6TNNdkzyfeUg4kfAOdjWeluH9QfBC6xgmpCNqvmldV1QkdwsRswunw/exec";

  const data = {}
fetch(dataUrl).then((res)=> res.json()).then((data)=>{
	data  = data
})