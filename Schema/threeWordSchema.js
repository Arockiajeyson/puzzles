const mongoose =require('mongoose')

const exercise = new mongoose.Schema({
    exerciseName:{type:String},
    sentence:{type:String},
    wordLength:{type:Number},
    Word1:{type:String},
    Word2:{type:String},
    Word3:{type:String},
    Word4:{type:String},
    Word5:{type:String},
    Audio1:{type:String},
    Audio2:{type:String},
    Audio3:{type:String},
    Audio4:{type:String},
    Audio5:{type:String},
})

const exerciseModel =mongoose.model('KEquestioner',exercise)
module.exports=exerciseModel