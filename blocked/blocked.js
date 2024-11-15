const url_params = new URLSearchParams(window.location.search);
const og_link = url_params.get('link');

document.addEventListener('click', (event) => {
    const target = event.target;
    switch (target.id) {
        case 'return_to_page':
            returnToPage();
            break;
        case 'close_page':
            closePage();
            return;
    }
});

function returnToPage() {
    let count = 10;

    const overlay = document.createElement('div');
    const createOverlay = () => {
        overlay.classList.add('overlay');
        overlay.innerText = `Returning in ${count} seconds.`;

        document.body.append(overlay);
    }
    createOverlay();

    const countdown = () => {
        console.log('count')
        const interval_countdown = setInterval(() => {
            if (count === 0) {
                clearInterval(interval_countdown);
                sendToPage();
                return;
            }
            console.log(count)
            count--;
            overlay.innerText = `Returning in ${count} seconds.`;
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