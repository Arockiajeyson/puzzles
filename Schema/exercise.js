const mongoose =require('mongoose')

const exercise = new mongoose.Schema({
    exerciseName:{type:String},
    email:{type:String}
})

const exerciseModel =mongoose.model('SB Exercise Master',exercise)
module.exports=exerciseModel 