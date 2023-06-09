const express =require('express')
const multer =require('multer')
const session =require('express-session')
const cookieParser = require("cookie-parser");
const app =express()
app.use(cookieParser());
app.use(session({secret: 'Your_Secret_Key', resave: true, saveUninitialized: true}))
const SchemaExercise =require('../Schema/exercise')
const ThreeWordS =require('../Schema/threeWordSchema')

// let existingExercise = ''
// let exerciseName=''
// let idED =0 
// let deleteExercise =''
// let levelName=''
// let leve1Completed =false
// let leve2Completed =false
// let leve3Completed =false
// let correctAnswerLevel1=0
// let totalQuestionLevel1=0
// let correctAnswerLevel2=0
// let totalQuestionLevel2=0
// let correctAnswerLevel3=0
// let totalQuestionLevel3=0

// let mode=0
// let start=0
// let AnwWord1 =''
// let AnwWord2 =''
// let AnwWord3 =''
// let AnwWord4 =''
// let AnwWord5 =''
// let autaAnswer =''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploaded files');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});


// Create multer instance with storage options
const upload = multer({ storage: storage });


const user ={
    names:'jeyson'
}

app.get('/adminbtn',async(req,res)=>{
    try {
        req.session.existingExercise = ''
        req.session.exerciseName=''
        req.session.idED =0 
        req.session.deleteExercise =''
        req.session.save()
        res.render('admin.jade')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/add',async(req,res)=>{
    try {
        console.log(req.session.exerciseName)
        res.render('Add.jade',{myva:req.session.exerciseName})
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/exerciseName',async(req,res)=>{
    try {
        res.render('exerciseName.jade')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/editanddelete',async(req,res)=>{
    try {
        const find = await SchemaExercise.find()
        res.render('editAndDelete.jade',{exercisename:find})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/getting/exercise',async(req,res)=>{
    try {
        
        // const find =await 
    } catch (error) {
        res.json(error.message)
    }
})


app.post('/editid',async(req,res)=>{
    try { 
        req.session.idED = req.body.id
        req.session.save()
        console.log(req.session.idED)
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/edit',async(req,res)=>{
    try {
        const finding = await ThreeWordS.findOne({_id:req.session.idED})
        console.log(finding)
        if(finding.wordLength ==3){
            console.log([finding])
            res.render('editing.jade',{edit:[finding],exnames:req.session.deleteExercise})
        }else if(finding.wordLength ==4){
            res.render('editing4.jade',{edit:[finding],exnames:req.session.deleteExercise})
        }else if(finding.wordLength ==5){
            res.render('editing5.jade',{edit:[finding],exnames:req.session.deleteExercise})
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/continue',async(req,res)=>{
    try {
        const find = await ThreeWordS.find({exerciseName:req.session.deleteExercise})
        // console.log(find)
        res.render('deleteORDelete.jade',{mydata:find,exnames:req.session.deleteExercise})
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/exerciseDate',async(req,res)=>{
    try {
        let word =req.body.name
        req.session.deleteExercise = word.toLocaleLowerCase()
        req.session.save()
        res.render('deleteORDelete.jade')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/threeWord',async(req,res)=>{
    try {
        res.render('AddThreeWords.jade',{data:req.session.exerciseName})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/fourWord',async(req,res)=>{
    try {
        // console.log(exerciseName)
        res.render('AddFourWords.jade',{data:req.session.exerciseName})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/fiveWord',async(req,res)=>{
    try {
        res.render('AddFiveWords.jade',{data:req.session.exerciseName})
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/exerciseAdding',async(req,res)=>{
    try {
        const create = await SchemaExercise.create(req.body)
        const find =await SchemaExercise.find()
        // console.log(find)
        res.redirect('/add')
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/threeworddata',upload.array('audioFiles', 3),async(req,res)=>{
    const da = req.body;
    // console.log(da)
    const audioUrls = req.files.map(file => file.filename);
    // console.log(audioUrls)
    const find =await SchemaExercise.find()
    let wordCap =req.body.word1
    req.body.word1 = wordCap.charAt(0).toUpperCase()+wordCap.slice(1)
    let megeringWord =`${req.body.word1} ${req.body.word2} ${req.body.word3}`
        const storingData = await ThreeWordS.create({
            exerciseName:req.session.exerciseName.toLocaleLowerCase(),
            wordLength:3,
            sentence:megeringWord,
            Word1:req.body.word1,
            Word2:req.body.word2,
            Word3:req.body.word3,
            Audio1:audioUrls[0],
            Audio2:audioUrls[1],
            Audio3:audioUrls[2]
        })
    res.redirect('/post/threeWord')
})



app.post('/fourworddata',upload.array('audioFiles1', 4),async(req,res)=>{
    const da = req.body;
    const audioUrls = req.files.map(file => file.filename);
    const find =await SchemaExercise.find()
    let wordCap =req.body.word1
    req.body.word1 = wordCap.charAt(0).toUpperCase()+wordCap.slice(1)
    let megeringWord =`${req.body.word1} ${req.body.word2} ${req.body.word3} ${req.body.word4}`
    const storingData = await ThreeWordS.create({
        exerciseName:req.session.exerciseName.toLocaleLowerCase(),
        wordLength:4,
        sentence:megeringWord,
        Word1:req.body.word1,
        Word2:req.body.word2,
        Word3:req.body.word3,
        Word4:req.body.word4,
        Audio1:audioUrls[0],
        Audio2:audioUrls[1],
        Audio3:audioUrls[2],
        Audio4:audioUrls[3]
    })
    
    // console.log(audioUrls)
    res.redirect('/post/fourWord')
})



app.post('/fiveworddata',upload.array('audioFiles2', 5),async(req,res)=>{
    const da = req.body;
    // console.log(da)
    const audioUrls = req.files.map(file => file.filename);
    const find =await SchemaExercise.find()
    let wordCap =req.body.word1
    req.body.word1 = wordCap.charAt(0).toUpperCase()+wordCap.slice(1)
    let megeringWord =`${req.body.word1} ${req.body.word2} ${req.body.word3} ${req.body.word4} ${req.body.word5}`
    console.log(megeringWord)
    const storingData = await ThreeWordS.create({
        exerciseName:req.session.exerciseName.toLocaleLowerCase(),
        wordLength:5,
        sentence:megeringWord,
        Word1:req.body.word1,
        Word2:req.body.word2,
        Word3:req.body.word3,
        Word4:req.body.word4,
        Word5:req.body.word5,
        Audio1:audioUrls[0],
        Audio2:audioUrls[1],
        Audio3:audioUrls[2],
        Audio4:audioUrls[3],
        Audio5:audioUrls[4] 
    })

    console.log(storingData)
    res.redirect('/post/fiveWord')
})



app.post('/exerciseNameStoring',async(req,res)=>{
    try {
        // console.log(req.body)
        let name =req.body.input
        if(name !='') {
            // console.log(req.body)
            req.session.exerciseName=name
            req.session.save()
            // word=myData
            const find =await SchemaExercise.findOne({exerciseName:req.body.input})
            // console.log(req.body)
            if(!find){
                const create =await SchemaExercise.create({exerciseName:req.body.input})
                create.save()
                // console.log('exercise name')
            }
        }
    } catch (error) {
        res.json(error)
    }
})



app.get('/threeworddataget',async(req,res)=>{
    try {
        res.render()
    } catch (error) {
        
    }
})

app.get('/delete',async(req,res)=>{
    try {
        res.redirect('/post/continue')
    } catch (error) {
        
    }
})

app.delete('/deleteex',async(req,res)=>{
    try {
        const delelting = await ThreeWordS.deleteOne({_id:req.body.id})
        // console.log(delelting)
        res.json('deleted')
    } catch (error) {
        res.json(error.message) 
    }
})


app.post('/editThree',upload.array("audioEdit",3),async(req,res)=>{
    try {
        
        const audioUrls = req.files.map(file => file.filename)
        
        const findingEx =await ThreeWordS.findOne({_id:req.session.idED})
        
        let Word1 = req.body.Word1
        let Word2 =req.body.Word2
        let Word3 =req.body.Word3
        let sentence =`${Word1} ${Word2} ${Word3}`
        req.body.sentence =sentence
        req.body.exerciseName =findingEx.exerciseName
        req.body.wordLength =findingEx.wordLength
        if(findingEx.Word1 != req.body.Word1 || findingEx.Word2 != req.body.Word2 || findingEx.Word3 != req.body.Word3){
            console.log('inside')
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0]
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]

            }
            else if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3 =audioUrls[1]
            }
            else if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1]
            }
            else if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3){
                req.body.Word1 = Word1
                req.body.Word2 = Word2
                req.body.Word3 = Word3
                req.body.Audio1 = audioUrls[0]
                req.body.Audio2 = audioUrls[1]
                req.body.Audio3=audioUrls[2]
            }
            else if(findingEx.Word1 !=Word1){
                req.body.Word1 = Word1
                req.body.Audio1 =audioUrls[0]
            }
            else if(findingEx.Word2 !=Word2){
                req.body.Word2 = Word2
                req.body.Audio2 =audioUrls[0]
            }
            else if(findingEx.Word3 !=Word3){
                req.body.Word3 = Word3
                req.body.Audio3 =audioUrls[0]
            }
        }
        const update =await ThreeWordS.updateOne({_id:findingEx._id},req.body)
        res.redirect('/post/continue')

    } catch (error) {
        res.json(error.message)
    }
})




app.post('/editFour',upload.array("audioEdit",4),async(req,res)=>{
    try {
        
        const audioUrls = req.files.map(file => file.filename)
        console.log(audioUrls)
        const findingEx =await ThreeWordS.findOne({_id:req.session.idED})
        
        let Word1 = req.body.Word1
        let Word2 =req.body.Word2
        let Word3 =req.body.Word3
        let Word4 =req.body.Word4
        let sentence =`${Word1} ${Word2} ${Word3} ${Word4}`
        req.body.sentence =sentence
        req.body.exerciseName =findingEx.exerciseName
        req.body.wordLength =findingEx.wordLength
        if(findingEx.Word1 != req.body.Word1 || findingEx.Word2 != req.body.Word2 || findingEx.Word3 != req.body.Word3 || findingEx.Word4 != req.body.Word4){
            // console.log('inside')
            if(findingEx.Word1 !=Word1){
                req.body.Word1 = Word1
                req.body.Audio1 =audioUrls[0]
            }
            if(findingEx.Word2 !=Word2){
                req.body.Word2 = Word2
                req.body.Audio2 =audioUrls[0]
            }
            if(findingEx.Word3 !=Word3){
                req.body.Word3 = Word3
                req.body.Audio3 =audioUrls[0]
            }
            if(findingEx.Word4 != Word4){
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[0]
            }

            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0]
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]

            }
            if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3 =audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word4 != Word4){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[1]
            }
            if(findingEx.Word2 != Word2 && findingEx.Word4 != Word4){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4 =audioUrls[1]
            }
            if(findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word3 = Word3
                req.body.Audio3=audioUrls[0] 
                req.body.Word4 =Word4
                req.body.Audio4 =audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0]
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[2]

            }
            if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3 =audioUrls[1]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1]
                req.body.Word4=Word4
                req.body.Audio4=audioUrls[2]
                // console.log('comming')
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word4 != Word4){
                // console.log('comming')
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 =Word2
                req.body.Audio2=audioUrls[1] 
                req.body.Word4=Word4
                req.body.Audio4=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word1 = Word1
                req.body.Word2 = Word2
                req.body.Word3 = Word3
                req.body.Word4 =Word4
                req.body.Audio1 = audioUrls[0]
                req.body.Audio2 = audioUrls[1]
                req.body.Audio3=audioUrls[2]
                req.body.Audio4=audioUrls[3]
            }

        }
        // console.log(req.body)
        const update =await ThreeWordS.updateOne({_id:findingEx._id},req.body)
        console.log(update)
        res.redirect('/post/continue')

    } catch (error) {
        res.json(error.message)
    }
})





app.post('/editFive',upload.array("audioEdit",5),async(req,res)=>{
    try {
        
        const audioUrls = req.files.map(file => file.filename)
        console.log(audioUrls)
        const findingEx =await ThreeWordS.findOne({_id:req.session.idED})
        
        let Word1 = req.body.Word1
        let Word2 =req.body.Word2
        let Word3 =req.body.Word3
        let Word4 =req.body.Word4
        let Word5 =req.body.Word5
        let sentence =`${Word1} ${Word2} ${Word3} ${Word4} ${Word5}`
        req.body.sentence =sentence
        req.body.exerciseName =findingEx.exerciseName
        req.body.wordLength =findingEx.wordLength
        if(findingEx.Word1 != req.body.Word1 || findingEx.Word2 != req.body.Word2 || findingEx.Word3 != req.body.Word3 || findingEx.Word4 != req.body.Word4 || findingEx.Word5 != req.body.Word5){
            // console.log('inside')
            if(findingEx.Word1 !=Word1){
                req.body.Word1 = Word1
                req.body.Audio1 =audioUrls[0]
            }
            if(findingEx.Word2 !=Word2){
                req.body.Word2 = Word2
                req.body.Audio2 =audioUrls[0]
            }
            if(findingEx.Word3 !=Word3){
                req.body.Word3 = Word3
                req.body.Audio3 =audioUrls[0]
            }
            if(findingEx.Word4 != Word4){
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[0]
            }
            if(findingEx.Word5 != Word5){
                req.body.Word5 =Word5
                req.body.Audio5=audioUrls[0]
            }

            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0]
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]

            }
            if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3 =audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word4 != Word4){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[1]
            }
            if(findingEx.Word2 != Word2 && findingEx.Word4 != Word4){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4 =audioUrls[1]
            }
            if(findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word3 = Word3
                req.body.Audio3=audioUrls[0] 
                req.body.Word4 =Word4
                req.body.Audio4 =audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word5 != Word5){
                req.body.Word1 = Word1
                req.body.Audio1=audioUrls[0] 
                req.body.Word5 =Word5
                req.body.Audio5 =audioUrls[1]
            }
            if(findingEx.Word2 != Word2 && findingEx.Word5 != Word5){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0] 
                req.body.Word5 =Word5
                req.body.Audio5 =audioUrls[1]
            }
            
            if(findingEx.Word3 != Word3 && findingEx.Word5 != Word5){
                req.body.Word3 = Word3
                req.body.Audio3=audioUrls[0] 
                req.body.Word5 =Word5
                req.body.Audio5 =audioUrls[1]
            }
            if(findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word4 = Word4
                req.body.Audio4=audioUrls[0] 
                req.body.Word5 =Word5
                req.body.Audio5 =audioUrls[1]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0]
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[2]

            }
            if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3 =audioUrls[1]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1]
                req.body.Word4=Word4
                req.body.Audio4=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word4 != Word4){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 =Word2
                req.body.Audio2=audioUrls[1] //
                req.body.Word4=Word4
                req.body.Audio4=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word5 != Word5){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 =Word2
                req.body.Audio2=audioUrls[1] //
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[1] //
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[2]
            }
            if(findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word3 =Word3
                req.body.Audio3 = audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[1] //
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[2]
            }
            if(findingEx.Word2 != Word2 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word2 =Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[1] //
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[2]
            }
            if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word5 != Word5){
                req.body.Word2 =Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1] //
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word5 != Word5){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1] //
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[2]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0] 
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[2]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[3]

            }
            if(findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word2 = Word2
                req.body.Audio2=audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3 =audioUrls[1]
                req.body.Word4 =Word4
                req.body.Audio4=audioUrls[2]
                req.body.Word5 =Word5
                req.body.Audio5=audioUrls[3]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[1]
                req.body.Word4=Word4
                req.body.Audio4=audioUrls[2]
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[3]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word1 =Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 =Word2
                req.body.Audio2=audioUrls[1] //
                req.body.Word4=Word4
                req.body.Audio4=audioUrls[2]
                req.body.Word5=Word5
                req.body.Audio5=audioUrls[3]
            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word5 != Word5){
                req.body.Word1 =Word1
                req.body.Audio1=audioUrls[0] 
                req.body.Word2=Word2
                req.body.Audio2=audioUrls[1]
                req.body.Word3 =Word3
                req.body.Audio3=audioUrls[2]
                req.body.Word5 =Word5
                req.body.Audio5=audioUrls[3]

            }
            if(findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5){
                req.body.Word1 = Word1
                req.body.Word2 = Word2
                req.body.Word3 = Word3
                req.body.Word4 =Word4
                req.body.Word5=Word5
                req.body.Audio1 = audioUrls[0]
                req.body.Audio2 = audioUrls[1]
                req.body.Audio3=audioUrls[2]
                req.body.Audio4=audioUrls[3]
                req.body.Audio5=audioUrls[4]
            }
        }
        // console.log(req.body)
        const update =await ThreeWordS.updateOne({_id:findingEx._id},req.body)
        console.log(update)
        res.redirect('/post/continue')

    } catch (error) {
        res.json(error.message)
    }
})

app.get('/addexercisetoexisting',async(req,res)=>{
    try {
        const find = await SchemaExercise.find()
        
        res.render('addexisting.jade',{exercisename:find})
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/ToExisiting',async(req,res)=>{
    try {
        req.session.existingExercise = req.body.name
        req.session.exerciseName =existingExercise
        req.session.save()
        // res.render('QuestionToExisting',{exname:req.body.exercise})
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/addingQToNew',async(req,res)=>{
    try {
        res.render('QuestionToExisting',{exname:req.session.existingExercise})
    } catch (error) {
        res.json(error.message)
    }
})



// student



app.get('/student',async(req,res)=>{
    try {
        req.session.leve1Completed =false
        req.session.leve2Completed =false
        req.session.leve3Completed =false
        req.session.correctAnswerLevel1=0
        req.session.totalQuestionLevel1=0
        req.session.correctAnswerLevel2=0
        req.session.totalQuestionLevel2=0
        req.session.correctAnswerLevel3=0
        req.session.totalQuestionLevel3=0
        req.session.autaAnswer=""
        req.session.mode=0
        req.session.start=0
        req.session.AnwWord1 =''
        req.session.AnwWord2 =''
        req.session.AnwWord3 =''
        req.session.AnwWord4 =''
        req.session.AnwWord5 =''
        req.session.save()
        const find = await SchemaExercise.find()
        res.render('studentLanding.jade',{exercisename:find})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/level',async(req,res)=>{
    try {
        console.log(req.session.levelName)
        req.session.correctAnswerLevel1=0
        req.session.totalQuestionLevel1=0
        req.session.correctAnswerLevel2=0
        req.session.totalQuestionLevel2=0
        req.session.correctAnswerLevel3=0
        req.session.totalQuestionLevel3=0
        req.session.save()
        res.render('levelsSelecting.jade',{name:req.session.levelName,level1:req.session.leve1Completed,level2:req.session.leve2Completed,level3:req.session.leve3Completed})
    } catch (error) {
        res.json(error)
    }
})



app.post('/levelValue',async(req,res)=>{
    try {
        req.session.levelName= req.body.name
        req.session.save()
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/mode',async(req,res)=>{
    try {
        // mode= req.body.Mode
       if(req.body.Mode =="Scan"){
        req.session.mode =1
        req.session.save()
       }else{
        req.session.mode=0
        req.session.save()
       }
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/level1TorF',async(req,res)=>{
    try {
        console.log('comoming',req.body.name)
        if(!req.session.leve1Completed){
            console.log('comoming')
            res.json('please complete level 1')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/level2TorF',async(req,res)=>{
    try {
        if(!req.session.leve1Completed || !req.session.leve2Completed){
            
            if(!req.session.leve1Completed && !req.session.leve2Completed){
                
                res.json('please complete level 1 and level 2')
                
            }else if(!req.session.leve1Completed){
                res.json('please complete level 1')
                
            }else{
                res.json('please complete level 2')
            }
        }
    } catch (error) {
        res.json(error.message)
    }
})




app.post('/resultAnswerL1',async(req,res)=>{
    try {
        req.session.AnwWord1 = req.body.Aword1
        req.session.AnwWord2 = req.body.Aword2
        req.session.AnwWord3 = req.body.Aword3
        
        req.session.answer = `${req.session.AnwWord1} ${req.session.AnwWord2} ${req.session.AnwWord3}`
        req.session.save()
        if(req.session.answer == req.session.autaAnswer){
            req.session.correctAnswerLevel1 = req.session.correctAnswerLevel1+1
            req.session.save()
        }
        if(req.session.mode ==1){
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/resultAnswerL2',async(req,res)=>{
    try {
        req.session.AnwWord1 = req.body.Aword1
        req.session.AnwWord2 = req.body.Aword2
        req.session.AnwWord3 = req.body.Aword3
        req.session.AnwWord4 = req.body.Aword4
        // console.log(req.body) 
        req.session.answer = `${req.session.AnwWord1} ${req.session.AnwWord2} ${req.session.AnwWord3} ${req.session.AnwWord4}`
        req.session.save()
        if(req.session.answer == req.session.autaAnswer){
            req.session.correctAnswerLevel2 = req.session.correctAnswerLevel2+1
            req.session.save()
        }
        if(req.session.mode ==1){
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/resultAnswerL3',async(req,res)=>{
    try {
        req.session.AnwWord1 = req.body.Aword1
        req.session.AnwWord2 = req.body.Aword2
        req.session.AnwWord3 = req.body.Aword3
        req.session.AnwWord4 = req.body.Aword4
        req.session.AnwWord5 =req.body.Aword5
        req.session.answer = `${req.session.AnwWord1} ${req.session.AnwWord2} ${req.session.AnwWord3} ${req.session.AnwWord4} ${req.session.AnwWord5}`
        req.session.save()
        // console.log(autaAnswer)
        // console.log(answer)
        if(req.session.answer == req.session.autaAnswer){
            req.session.correctAnswerLevel3 = req.session.correctAnswerLevel3+1
            req.session.save()
        }
        if(req.session.mode ==1){
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/nextQ',async(req,res)=>{
    try {
        req.session.start =req.session.start+1
        req.session.save()
        res.redirect('/post/level1game')
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/level1game',async(req,res)=>{

    try {
        // level1 =true
        if(req.session.correctAnswerLevel1 > req.session.totalQuestionLevel1) {
            req.session.correctAnswerLevel1=0
            req.session.save()
        }
        let m =req.session.levelName
        const find =await ThreeWordS.find({exerciseName:m.toLocaleLowerCase(),wordLength:3})
        req.session.totalQuestionLevel1=find.length
        const filter = find.slice(req.session.start,req.session.start+1)
        if(filter.length !=0){
            req.session.autaAnswer = filter[0].sentence
            req.session.save()
            res.render('level1.jade',{question:filter,level:req.session.start+1,mode:req.session.mode})
        }else{
            req.session.start=0
            req.session.leve1Completed =true
            req.session.save()
            res.render('result.jade',{correct:req.session.correctAnswerLevel1,total:req.session.totalQuestionLevel1})
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/nextQLev2',async(req,res)=>{
    try {
        req.session.start =req.session.start+1
        req.session.save()
        res.redirect('/post/level2game')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/level2game',async(req,res)=>{
    try {
        // level1 =false
        // level2 =true
        req.session.correctAnswerLevel1=0
        req.session.totalQuestionLevel1=0
        req.session.save()
        if(req.session.correctAnswerLevel2 > req.session.totalQuestionLevel2) {
            req.session.correctAnswerLevel2=0
            req.session.save()
        }
        let m =req.session.levelName
        const find =await ThreeWordS.find({exerciseName:m.toLocaleLowerCase(),wordLength:4})
       
        req.session.totalQuestionLevel2=find.length
        req.session.save()
        const filter = find.slice(req.session.start,req.session.start+1)
        if(filter.length != 0){
            req.session.autaAnswer = filter[0].sentence
            req.session.save()
            res.render('level2.jade',{question:filter,level:req.session.start+1,mode:req.session.mode})
        }else{
            req.session.start=0
            req.session.leve2Completed =true
            req.session.save()
            res.render('result.jade',{correct:req.session.correctAnswerLevel2,total:req.session.totalQuestionLevel2})
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/nextQLev3',async(req,res)=>{
    try {
        req.session.start =req.session.start+1
        res.redirect('/post/level3game')
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/level3game',async(req,res)=>{
    try {
        // level1 =false
        // level2 =true
        req.session.correctAnswerLevel1=0
        req.session.totalQuestionLevel1=0
        req.session.correctAnswerLevel2=0
        req.session.totalQuestionLevel2=0
        req.session.save()
        if(req.session.correctAnswerLevel3 > req.session.totalQuestionLevel3) {
            req.session.correctAnswerLevel3=0
            req.session.save()
        }
        let m =req.session.levelName
        const find =await ThreeWordS.find({exerciseName:m.toLocaleLowerCase(),wordLength:5})
        req.session.totalQuestionLevel3=find.length
        req.session.save()
        const filter = find.slice(req.session.start,req.session.start+1)
        if(filter.length != 0){
            req.session.autaAnswer = filter[0].sentence
            // console.log(autaAnswer)
            req.session.save()
            res.render('level3.jade',{question:filter,level:req.session.start+1,mode:req.session.mode})
        }else{
            req.session.start=0
            req.session.leve2Completed =true
            req.session.save()
            res.render('result.jade',{correct:req.session.correctAnswerLevel3,total:req.session.totalQuestionLevel3})
        }
    } catch (error) {
        res.json(error.message)
    }
})

module.exports=app