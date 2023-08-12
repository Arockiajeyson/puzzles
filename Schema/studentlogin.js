const mongoose =require('mongoose')

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	studentname: {
		type: String
	},
	name: {
		type: String
	},
	age: {
		type: Number
	},
	school: {
		type: String
	},
	classname: {
		type: String
	},
	ilike: {
		type: String
	},
	idislike: {
		type: String
	},
	backgroundcolor: {
		type: String
	},
	scancolor: {
		type: String
	},
	textcolor: {
		type: String
	},
	textsize: {
		type: String
	},
	operationalmode: {
		type: Number
	},
	teachername_fk: {
		type: String
	},
        createdAt: { type: Date, required: true, default: Date.now }
});

let User = mongoose.model('User', UserSchema);

module.exports=User