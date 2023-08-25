const socket = io();

let name;

let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do {
    name = prompt('Please enter your name');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,   // Add a comma here
        message: message.trim()
    };

    appendMessage(msg, 'outgoing');
    scrollToBottom ()

    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div'); // Fixed: 'div' should be a string
    let className = type;

    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom ()
});


function scrollToBottom () {

    messageArea.scrollTop = messageArea.scrollHeight
}