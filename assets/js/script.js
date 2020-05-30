
document.querySelectorAll('.f-copy:not(.has-overlay)').forEach(el => {
    el.addEventListener('click', () => {
        let source = el.dataset.source;
        let type = el.dataset.type;
        updateClipboard(copy[source][type]);
    });
});
document.querySelectorAll('.f-copy.has-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
        let target = e.target;
        let source = el.dataset.source;
        let type = target.dataset.type;
        updateClipboard(copy[source][type]);
    });
});

document.querySelectorAll('.f-copy').forEach(el => {
    let label = el.querySelector('.f-copy-label');
    el.querySelectorAll('.f-copy-overlays span').forEach(span => {
        span.addEventListener('mouseenter', () => {
            let newLabel = span.dataset.label;
            label.innerText = newLabel;
        });
        span.addEventListener('mouseleave', () => {
            let newLabel = label.dataset.label;
            label.innerText = newLabel;
        });
    });
});

function updateClipboard(copy) {
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(copy).then(function () {
                niceAlert('Copied');
            }, function () {
                niceAlert('Error. Cannot copy');
            });
        } else {
            niceAlert('Your browser does not support Clipboard API.');
        }
    }, function () {
        niceAlert('Your browser does not support Clipboard API.', 2000);
    });
}

function removeAlerts() {
    document.querySelectorAll('.c-alert').forEach(el => {
        el.remove();
    });
}
function niceAlert(string, delay = 600) {
    removeAlerts();

    var element = document.createElement('aside');
    var text = document.createTextNode(string);
    element.appendChild(text);
    element.classList.add('c-alert');
    document.body.appendChild(element);
    setTimeout(() => {
        element.classList.add('is-active');
    }, 100);
    setTimeout(() => {
        element.classList.add('is-out');
    }, delay - 100);
    setTimeout(() => {
        removeAlerts();
    }, delay);

}