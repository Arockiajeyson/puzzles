const mongoose =require('mongoose')

const exercise = new mongoose.Schema({},{strict:false})

const exerciseModel =mongoose.model('SB QMaster',exercise)
module.exports=exerciseModel