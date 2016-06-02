var express = require('express');
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + "/public/html/index.html" );
})

// send to edison 
var SendToEdison = function(id, action) {
	var edison_url;
	if (id === "1") {
		// edison_url = "http://192.168.11.188:1338/led";
		edison_url = "http://localhost:5000/led";
	} else if (id === "2") {
		edison_url = "http://localhost:8000/led";
	}
	/* ++++++++ send request ++++++++++ */
	request.get({
		url: edison_url+action,
		form: {action: action}
	}, function(err, respon, body){
		//if (err) throw err;
		console.log("Sent %s", edison_url + action);
	});
};

// show action on browser
var ShowOnBrowser = function(id, action) {
	if (id === "1") {
		io.emit('show1', action);
	} else if (id === "2") {
		io.emit('show2', action);
	}
};

// API :: get data from other devices
app.get("/get", function(req, res){
	var id = req.param('id');
	var action = req.param('action');
	switch(action) {
		case "On":
		case "Off":
		case "Middle": 
			SendToEdison(req.param('id'), req.param('action'));
			ShowOnBrowser(id, action);
		break;
		default:
	}  
	// SendToEdison(req.param('id'), req.param('action'));
	// ShowOnBrowser(id, action);
})

// get data from browser
io.on('connection', function(socket){
	socket.on('getdata', function(data){
		var id = data.id;
		var action = data.action;
		console.log(data);
		SendToEdison(data.id, data.action);
		ShowOnBrowser(id, action);
	})
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
// var server = app.listen(3000,'192.168.88.89', function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)
// })

