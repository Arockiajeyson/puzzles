const mongoose =require('mongoose')

const exercise = new mongoose.Schema({
    exerciseName:{type:String},
    email:{type:String},
    username:{type:String},
    level1:{type:String},
    level2:{type:String},
    level3:{type:String},
})

const Model =mongoose.model('SB student result',exercise)
module.exports=Model 