console.log('unShort content_script running')
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "shorts") {
        if (document.body) {
            document.body.remove();
            const link = window.location.href;
            window.location = chrome.runtime.getURL('blocked/blocked.html') + `?link=${encodeURIComponent(link)}`;
        }        
    }

    sendResponse({tabExcepted: false, message: "Content script: this is a Youtube Shorts page!"});
});