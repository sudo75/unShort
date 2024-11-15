console.log('unShort BG_test');
let tabExceptions = []; // list IDs
let firstLoad = true; // for first time extension is run

const checkURL = () => {
    console.log('url_check');

    setTimeout(() => {
        //CHeck all tabs
        chrome.tabs.query({}, (tabs) => {
            //console.log(tabs)
            tabs.forEach(tab => {
                const url = tab.url;

                if (!url) return;

                if (tabExcepted(tab.id, url)) {
                    console.log(`TabID: ${tab.id}, URL: ${url}`)
                }


                if (includesURL(url, "youtube.com/shorts") && tab.active) {
                    if (firstLoad) {
                        chrome.tabs.reload(tab.id);
                        firstLoad = false;
                    }

                    if (tabExcepted(tab.id, url)) {
                        return;
                    }

                    const queryString = url.split('?')[1];
                    const urlParams = new URLSearchParams(queryString);
                    const blocked = urlParams.get('blocked') === 'false' ? false : true;

                    const baseURL = url.split('?')[0];
                    if (!blocked) {
                        tabExceptions.push({id: tab.id, url: baseURL});
                        return;
                    }

                    chrome.tabs.sendMessage(tab.id, { action: "shorts"}, (response) => {
                        if (response) {
                            console.log(response.message);
                            if (response.tabExcepted) {
                                tabExceptions.push({id: tab.id, url: url});
                            }
                        } else {
                            console.log("Error fetching response");
                        }
                    });
                }
            });
        });
        

        checkURL();
    }, 1000);
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //tabExceptions.push(tabId);
    if (changeInfo.status === 'complete') {
        //removeTabException(tabId, tab.url);
        console.log(`Tab ${tabId} finished loading: ${tab.url}`);
    }
});

checkURL();

function tabExcepted(id, url) {
    for (let i = 0; i < tabExceptions.length; i++) {
        if (id === tabExceptions[i].id && url === tabExceptions[i].url) {
            return true;
        }
    }
    return false;
}

function removeTabException(id, url) {
    for (let i = 0; i < tabExceptions.length; i++) {
        if (id === tabExceptions[i].id && url === tabExceptions[i].url) {
            tabExceptions.slice(i, 1);
        }
    }
}

function includesURL(url, urlSeg) {
    if (url.includes(urlSeg)) {
        return true;
    }
    return false;
}