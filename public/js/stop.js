var app = angular.module('STOP');
// var socket = io.connect();

/*---------------   AngularJS  --------------*/
app.controller('myCtl1', function($scope) {
  $scope.button1=function(){
    // send socket data to server
    console.log("1");
    // socket.emit('button', 1);
  };
  $scope.button2=function(){
    // socket.emit('button', 2);
  };
  $scope.button3=function(){
    // socket.emit('button', 2);
  };
});