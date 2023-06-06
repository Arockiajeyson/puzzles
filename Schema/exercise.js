const mongoose =require('mongoose')

const exercise = new mongoose.Schema({
    exerciseName:{type:String}
})

const exerciseModel =mongoose.model('exerciseName',exercise)
module.exports=exerciseModel 