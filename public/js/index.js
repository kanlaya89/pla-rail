var app = angular.module('SPEED', []);
var socket = io.connect();

app.controller('myCtl1', function($scope){
  // set default checked radio id=1
  $scope.id = '1';
  // id radio button is checked
  $scope.radio1=function() {
    console.log("radio1");
    $("#screen").removeClass("radio2").addClass("radio1");
  }
  $scope.radio2=function() {
    $("#screen").removeClass("radio1").addClass("radio2");
    console.log("radio2");
  }

  // speed button is clicked
  $scope.on=function(){
    data = {id:$scope.id, action:"On"}
    // send socket data to server
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
// get socket data from server
socket.on('show1', function(action){
  console.log('show1'+ action);
  $('#show1').text(action);
});
socket.on('show2', function(action){
  $('#show2').text(action);
});
