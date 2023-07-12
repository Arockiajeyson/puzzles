const mongoose =require('mongoose')

const exercise = new mongoose.Schema({
    Teachermail:{type:String},
    password:{type:String}
})

const Model =mongoose.model('SB Teacher detail',exercise)
module.exports=Model 