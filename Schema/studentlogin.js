const mongoose =require('mongoose')

const exercise = new mongoose.Schema({
    Teacheremail:{type:String},
    StudentName:{type:String}
})
    

const Model =mongoose.model('SB Student detail',exercise)
module.exports=Model 