angular.module("chatApp.services").service("ChatService", function($q) {
    var service = {}, listener = $q.defer(), socket = {};

    service.SOCKET_URL = "ws://localhost:8025/websockets/eliza";

    service.receive = function() {
        return listener.promise;
    };

    service.send = function(message) {
        socket.send(message);
    };

    var initialize = function() {
        socket = new WebSocket(service.SOCKET_URL);
        socket.onmessage = function(msg) {
            listener.notify(msg.data);
        };
    };

    initialize();
    return service;
});