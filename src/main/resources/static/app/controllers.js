angular.module("chatApp.controllers").controller("ChatCtrl", function($scope, ChatService) {
    $scope.messages = [];
    $scope.message = "";

    var scrollDown = function() {
        var chat = $('#chat');
        chat.stop().animate({
            scrollTop: chat[0].scrollHeight
        });
    };

    $scope.addMessage = function() {
        var msg = {message: $scope.message, received: false};
        $scope.messages.push(msg);
        ChatService.send(msg);
        $scope.message = "";

        scrollDown();
    };

    ChatService.receive().then(null, null, function(message) {
        $scope.messages.push({message: message, received: true});

        scrollDown();
    });
});