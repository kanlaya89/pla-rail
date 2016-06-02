var app = angular.module('SPEED', []);
var socket = io.connect();

/*---------------   AngularJS  --------------*/
app.controller('myCtl1', function($scope){
  // set default checked radio id=1
  $scope.id = '1';

  //---- id radio button is checked
  $scope.radio1=function() {
    $("#screen").removeClass("radio2").addClass("radio1");
    $("#id1").addClass("id");
    $("#id2").removeClass("id");
  }
  $scope.radio2=function() {
    $("#screen").removeClass("radio1").addClass("radio2");
    $("#id2").addClass("id");
    $("#id1").removeClass("id");
  }

  //---- speed button is clicked
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

//---- get socket data from server
socket.on('show', function(data) {
  id = data.id;
  action = data.action;
  switch (action) {
    case "On": 
      $("#show"+id).addClass("green").removeClass("yellow").removeClass("red");
      break;
    case "Middle": 
      $("#show"+id).addClass("yellow").removeClass("green").removeClass("red"); 
      break;
    case "Off": 
      $("#show"+id).addClass("red").removeClass("green").removeClass("yellow"); 
      break;
    default:
      break;
  }
  //---- display on browser
  $('#show'+id).text(action);
});
