var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var options = {
  origin: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  maxAge: 3600
};




app.options(['/works','/works/:id'], cors(options));
app.get('/', function(req, res){
	res.send('Hello from API!');
})


// Типы работы
app.get('/works', function(req, res){
	db.get().collection('works').find().toArray(function(err, docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
})
app.get('/works/:id', function(req, res){
	db.get().collection('works').findOne({_id: ObjectID(req.params.id)}, function(err, docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
});

app.post('/works', function(req, res){
	var work = {
		title: req.body.title
	};
	db.get().collection('works').insert(work, function(err, result){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(work);
	})
});

app.put('/works/:id', function(req, res){
	db.get().collection('works').updateOne(
		{_id: ObjectID(req.params.id)},
		{title: req.body.title},
		function(err, result){
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			console.log(result);
			res.sendStatus(200);
		}
	)
});

app.delete('/works/:id', function(req, res){
	db.get().collection('works').deleteOne(
		{_id: ObjectID(req.params.id)},
		function(err, result){
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			console.log(result);
			res.sendStatus(200);
		}
	)
});



db.connect('mongodb://admin:admin@ds149489.mlab.com:49489/raspberriesapi', function(err, database){
//MongoClient.connect('mongodb://localhost:27017/raspberriesapi', function(err, database){
	if(err){
		return console.log(err);
	}
	app.listen(3012, function(){
		console.log('API started on Node.js + MongoDB');
	});
});


