var mongoose 	= require('mongoose'),
	Schema		= mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
	name: {type: String},
	local: {
		email: {type: String, uniqueness: true},
		password: {type: String},
	},
	username: {type: String, uniqueness: true},
	birthday: {
		day: {type: Number},
		month: {type: Number}
	},
	createdAt: {type: Date, default: Date.now}
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8),
	null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password)
};

module.exports = mongoose.model('User', userSchema);