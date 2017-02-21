var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var worksController = require('./controllers/works');

// API urls
var uriW = '/works';

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var options = {
  origin: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  maxAge: 3600
};
app.options([uriW,uriW + '/:id'], cors(options));
app.get('/', function(req, res){
	res.send('API started!');
})


// API Works

app.get(uriW, worksController.all);
app.get(uriW + '/:id', worksController.findById);
app.post(uriW, worksController.create);
app.put(uriW + '/:id', worksController.update);
app.delete(uriW + '/:id', worksController.delete);



db.connect('mongodb://admin:admin@ds149489.mlab.com:49489/raspberriesapi', function(err, database){
//MongoClient.connect('mongodb://localhost:27017/raspberriesapi', function(err, database){
	if(err){
		return console.log(err);
	}
	app.listen(3012, function(){
		console.log('API started on Node.js + MongoDB');
	});
});


