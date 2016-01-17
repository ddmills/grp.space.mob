var socket = io();

function addChatEntry(msg) {
    $('.chat-entries').append(
        `<div class='chat-entry'>
            <div class='chat-entry-avatar'>
                DM
            </div>
            <div class='chat-entry-header'>
                <span class='chat-entry-author'>
                    ddmills
                </span>
                <span class='chat-entry-date'>
                    Fri Jan 15 7:23:22
                </span>
            </div>
            <div class='chat-entry-content'>
                <p>${msg}</p>
            </div>
        </div>`
    );
}

$(document).on('click', '.chat-input-send', function() {
    var msg = $('.chat-input-message').val();
    socket.emit('chat-send-message', msg);
    $('.chat-input-message').val('');
    $('.chat-input-message').focus();
    return false;
});

socket.on('chat-recieve', function(msg) {
    addChatEntry(msg);
});

socket.on('chat-user-disconnect', function() {
    addChatEntry("User left...");
});
