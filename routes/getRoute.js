const express =require('express')
const mongoose =require('mongoose')
const ex =require('./postRoute').exerciseName
const app =express()
app.get('/',async(req,res)=>{
    try {
        res.render('views.jade')
        // addEventListener('mouseout')
    } catch (error) {
        res.json(error.message)
    }
})

module.exports =app