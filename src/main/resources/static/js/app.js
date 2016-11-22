$(function () {
    var connection = new WebSocket('ws://localhost:8025/websockets/eliza');

    connection.onopen = function () {
        console.log('connection opened');
    };

    connection.onclose = function () {
        console.log('connection closed');
    };

    connection.onmessage = function (e) {
        console.log('error: ' + e.data);
    };

    connection.onmessage = function (msg) {
        console.log('received data: ' + msg.data);
        if (msg.data != '---') {
            $('#chatLog').append('<li class="list-group-item text-left">' + msg.data + '</li>');
            $('#chat').stop().animate({
                scrollTop: $('#chat')[0].scrollHeight
            });
        }
    };

    $('#sendMessage').click(function () {
        var msg = $('#message').val();
        console.log('sending data: ' + msg);
        connection.send(msg);
        $('#chatLog').append('<li class="list-group-item text-right">' + msg + '</li>');
        $('#message').val(null);
        $('#chat').stop().animate({
            scrollTop: $('#chat')[0].scrollHeight
        });
    });

    $('#message').on('keypress', function(e) {
        if (e.which == 13 && $('#message').val() != '')
            $('#sendMessage').click();
    });
});
