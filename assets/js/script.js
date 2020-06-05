
document.querySelectorAll('.f-copy:not(.has-overlay)').forEach(el => {
    el.addEventListener('click', () => {
        let source = el.dataset.source;
        let type = el.dataset.type;
        let label = el.querySelector('.f-copy-label').innerText;
        updateClipboard(copy[source][type], label);
    });
});
document.querySelectorAll('.f-copy.has-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
        let target = e.target;
        let source = el.dataset.source;
        let type = target.dataset.type;
        let label = el.querySelector('.f-copy-label').innerText;
        updateClipboard(copy[source][type], label);
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


document.querySelectorAll('.f-images').forEach(el => {
    let image = el.querySelector('.f-images-image');
    el.querySelectorAll('.f-images-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            let newSrc = item.dataset.src;
            image.setAttribute('src', newSrc);
            el.setAttribute('href', newSrc);
        });
    });
});

function updateClipboard(copy, label) {
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(copy).then(function () {
                if (label) {
                    niceAlert('Copied', 600, label);
                } else {
                    niceAlert('Copied');
                }
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
function niceAlert(string, delay = 600, subtitle) {
    removeAlerts();
    var element = document.createElement('aside');
    var text = document.createTextNode(string);
    element.appendChild(text);
    console.log(subtitle);
    if (subtitle) {
        var span = document.createElement('span');
        var sub = document.createTextNode(subtitle);
        span.appendChild(sub);
        element.appendChild(span);
    }
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