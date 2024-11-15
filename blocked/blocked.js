const url_params = new URLSearchParams(window.location.search);
const og_link = url_params.get('link');

let counting = false;

document.addEventListener('click', (event) => {
    const target = event.target;
    switch (target.id) {
        case 'return_to_page':
            returnToPage();
            break;
        case 'close_page':
            closePage();
            break;
        case 'overlay_cancel_btn':
            closeOverlay();
            break;
    }
});

function returnToPage() {
    let count = 10;

    createOverlay(count);

    const countdown = () => {
        counting = true;
        const interval_countdown = setInterval(() => {
            if (count === 0) {
                clearInterval(interval_countdown);
                sendToPage();
                return;
            }
            if (!counting) {
                clearInterval(interval_countdown);
                return;
            }
            count--;
            document.querySelector('#overlay_txt').innerText = `Returning in ${count} seconds.`;
        }, 1000); // Set interval to 1000 ms (1 second)
    };

    countdown();

    function sendToPage() {
        window.location = og_link + `?blocked=false`;
        console.log(og_link);
    }
}


function closePage() {
    window.close();
}

function createOverlay(count) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    
    const overlayTxt = document.createElement('h2');
    overlayTxt.id = 'overlay_txt';
    overlayTxt.innerText = `Returning in ${count} seconds.`;

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'overlay_cancel_btn';
    cancelBtn.innerText = "Cancel";

    overlay.append(overlayTxt);
    overlay.append(cancelBtn);

    document.body.append(overlay);
}

function closeOverlay() {
    counting = false;
    const overlay = document.querySelector('.overlay');
    overlay.remove();
}