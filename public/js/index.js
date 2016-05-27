var app = angular.module('SPEED', []);
var socket = io.connect();

app.controller('myCtl1', function($scope){
  $scope.on=function(){
    data = {id:$scope.id, action:"On"}
    // send socket_data to server
    socket.emit('getdata', data);
  };
  $scope.middle=function(){
    data = {id:$scope.id, action:"Middle"}
    socket.emit('getdata', data);
  };
  $scope.off=function(){
    data = {id:$scope.id, action:"Off"}
    socket.emit('getdata', data);
  };
});
// get socket_data from server
socket.on('show1', function(action){
  console.log('show1'+ action);
  $('#show1').text("No1 is "+ action);
});
socket.on('show2', function(action){
  $('#show2').text("No2 is "+ action);
});
