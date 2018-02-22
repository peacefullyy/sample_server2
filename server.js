var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Users = require('./model');

mongoose.connect('mongodb://localhost/model');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

/*
app.get('/get', function(req,res){
    model.find(function(err, model){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(model);
    })
});
*/


app.post('/signup', function(req, res){
	
	//console.log(req.body);

	var newOne = new Users({
		
		id: req.body.id,
		pw: req.body.pw,
		name: req.body.name,
		email: req.body.email,
		gender: req.body.gender,
		loc: req.body.loc
		
	});

	newOne.save(function(err){
			if(err){
				console.error(err);
				res.json({result: "fail"});
				return;
			}
			res.json({result: "success"});
			
	});
});
	
app.get('/findall', function(req,res){
    
	Users.find(function(err, users){
    
    if(err) return res.status(500).send({error: err});

	res.json({data:users});

    });
	
});

	
	
/* // GET SINGLE BOOK
app.get('/api/books/:book_id', function(req, res){
    Book.findOne({_id: req.params.book_id}, function(err, book){
        if(err) return res.status(500).json({error: err});
        if(!book) return res.status(404).json({error: 'book not found'});
        res.json(book);
    })
}); */
	

//안되는 코드 (응 이제 된다)
app.get('/find/:ById', function(req,res){
	
		Users.findById(req.params.ById, function(err, data){
			
			if(err) return res.status(500).json({error: err});
			
			res.json(data);
			
		});

});

app.post('/signin/', function(req,res){
	
		Users.login(req.body.id, req.body.pw, function(err, data){
			
			if(err) return res.status(500).json({error: err});
			if(data) return res.json("hi "+data.name);
			
		});

});



/* 	
	// 되는 코드
app.get('/find/:ById', function(req,res){	
	Users.findOne()
	.where('id', req.params.ById)
	.exec(function (err, user) {
		if (err) return res.status(500).json({error: err});
		if(!user) return res.status(404).json({error: 'not found'});
		res.json(user);
	
	});
}); */





/*
  User.findOne({url: req.params.longUrl}, function (err, doc){
    if (doc){
      res.send({'key': bijective.encode(doc._id)});
    } else {

      var newUrl = User({
        url: req.params.longUrl
      });

      newUrl.save(function(err) {
        if (err) console.log(err);

        res.send({'key': bijective.encode(newUrl._id)});
      });
    }

  });
*/


/*
app.get('/:key', function(req, res){

  var id = bijective.decode(req.params.key);

  User.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect("/");
    }
  });

});

*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
