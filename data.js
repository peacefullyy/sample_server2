var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
});

var kittySchema = mongoose.Schema({
  name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); 


  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
  
  Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log('now log');
  console.log(kittens);
});
fluffy.find(function(err, fluffy.find)
/*
Kitten.find({ name: /^fluff/ }, callback);
*/