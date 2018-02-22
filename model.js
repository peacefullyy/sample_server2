var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  
    id: {type: String, required: true, unique: true},
	pw: {type: String, required: true},
	name: {type: String, required: true},
	email: {type: String},
	gender: {type: String},
	loc: {type: String}
	
});


/*
userSchema.pre('save', function(next){
  var self = this;
  sequences.findOneAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, {upsert: true}, function(error, result) {
    console.log(result);
    if (error) return next(error);
    self.created_at = new Date();
    self._id = result.seq;
    next();
  });
});
*/

userSchema.statics.findById = function(ById, callback) {
  return this.findOne({ id: ById }, callback);
};

userSchema.statics.findByPw = function(ByPw, callback) {
  return this.findOne({ pw: ByPw }, callback);
};

userSchema.statics.login = function(id, pw, callback) {
  return this.findOne({id: id, pw: pw }, callback);
};


var Users = mongoose.model('Users', userSchema);

module.exports = Users;