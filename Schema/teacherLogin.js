var mongoose = require('mongoose');

var TeacherloginSchema = new mongoose.Schema({
	name:{
		type: String,
     	index: true
	},
	username: {
		type: String,
	},
	password: {
		type: String
	},
	school: {
		type: String
	},
	resetPasswordToken: {
		 type: String
	},
    resetPasswordExpires: {
    	 type: Date
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now }
});

const loging =mongoose.model('Teacherlogin', TeacherloginSchema);
module.exports = loging
