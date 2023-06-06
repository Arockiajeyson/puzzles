const express =require('express')
const multer =require('multer')
const app =express()
const SchemaExercise =require('../Schema/exercise')
const ThreeWordS =require('../Schema/threeWordSchema')
let existingExercise = ''
let exerciseName=''
let idED =0 
let deleteExercise =''
let levelName=''
let leve1Completed =false
let leve2Completed =false
let leve3Completed =false
let correctAnswerLevel1=0
let totalQuestionLevel1=0
let correctAnswerLevel2=0
let totalQuestionLevel2=0
let correctAnswerLevel3=0
let totalQuestionLevel3=0
let completedAnswer=0
let mode=0
let start=0
let AnwWord1 =''
let AnwWord2 =''
let AnwWord3 =''
let AnwWord4 =''
let AnwWord5 =''
let autaAnswer =''
let level1=false
let level2=false
let level3=false
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




app.get('/adminbtn',async(req,res)=>{
    try {
        existingExercise = ''
        exerciseName=''
        res.render('admin.jade')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/add',async(req,res)=>{
    try {
        console.log(exerciseName)
        res.render('Add.jade',{myva:exerciseName})
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
        idED = req.body.id
        console.log(idED)
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/edit',async(req,res)=>{
    try {
        const finding = await ThreeWordS.findOne({_id:idED})
        console.log(finding)
        if(finding.wordLength ==3){
            console.log([finding])
            res.render('editing.jade',{edit:[finding],exnames:deleteExercise})
        }else if(finding.wordLength ==4){
            res.render('editing4.jade',{edit:[finding],exnames:deleteExercise})
        }else if(finding.wordLength ==5){
            res.render('editing5.jade',{edit:[finding],exnames:deleteExercise})
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/continue',async(req,res)=>{
    try {
        const find = await ThreeWordS.find({exerciseName:deleteExercise})
        // console.log(find)
        res.render('deleteORDelete.jade',{mydata:find,exnames:deleteExercise})
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/exerciseDate',async(req,res)=>{
    try {
        let word =req.body.name
        deleteExercise = word.toLocaleLowerCase()
        res.render('deleteORDelete.jade')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/threeWord',async(req,res)=>{
    try {
        res.render('AddThreeWords.jade',{data:exerciseName})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/fourWord',async(req,res)=>{
    try {
        // console.log(exerciseName)
        res.render('AddFourWords.jade',{data:exerciseName})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/fiveWord',async(req,res)=>{
    try {
        res.render('AddFiveWords.jade',{data:exerciseName})
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
            exerciseName:exerciseName.toLocaleLowerCase(),
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
        exerciseName:exerciseName.toLocaleLowerCase(),
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
        exerciseName:exerciseName.toLocaleLowerCase(),
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
            exerciseName=name
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
        
        const findingEx =await ThreeWordS.findOne({_id:idED})
        
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
        const findingEx =await ThreeWordS.findOne({_id:idED})
        
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
        const findingEx =await ThreeWordS.findOne({_id:idED})
        
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
        existingExercise = req.body.name
        exerciseName =existingExercise
        // res.render('QuestionToExisting',{exname:req.body.exercise})
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/addingQToNew',async(req,res)=>{
    try {
        res.render('QuestionToExisting',{exname:existingExercise})
    } catch (error) {
        res.json(error.message)
    }
})



// student



app.get('/student',async(req,res)=>{
    try {
        const find = await SchemaExercise.find()
        res.render('studentLanding.jade',{exercisename:find})
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/level',async(req,res)=>{
    try {
        console.log('here')
        res.render('levelsSelecting.jade',{name:levelName,level1:leve1Completed,level2:leve2Completed,level3:leve3Completed})
    } catch (error) {
        res.json(error)
    }
})



app.post('/levelValue',async(req,res)=>{
    try {
        levelName= req.body.name
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/mode',async(req,res)=>{
    try {
        // mode= req.body.Mode
       if(req.body.Mode =="Scan"){
        mode =1
       }else{
        mode=0
       }
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/level1TorF',async(req,res)=>{
    try {
        console.log('comoming',req.body.name)
        if(!leve1Completed){
            console.log('comoming')
            res.json('please complete level 1')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/level2TorF',async(req,res)=>{
    try {
        if(!leve1Completed || !leve2Completed){
            
            if(!leve1Completed && !leve2Completed){
                
                res.json('please complete level 1 and level 2')
                
            }else if(!leve1Completed){
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
        AnwWord1 = req.body.Aword1
        AnwWord2 = req.body.Aword2
        AnwWord3 = req.body.Aword3
        console.log(mode)
        let answer = `${AnwWord1} ${AnwWord2} ${AnwWord3}`
        if(answer == autaAnswer){
                correctAnswerLevel1 = correctAnswerLevel1+1
        }
        if(mode ==1){
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/resultAnswerL2',async(req,res)=>{
    try {
        AnwWord1 = req.body.Aword1
        AnwWord2 = req.body.Aword2
        AnwWord3 = req.body.Aword3
        AnwWord4 = req.body.Aword4
        console.log(req.body) 
        let answer = `${AnwWord1} ${AnwWord2} ${AnwWord3} ${AnwWord4}`
        if(answer == autaAnswer){
                correctAnswerLevel2 = correctAnswerLevel2+1
        }
        if(mode ==1){
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/resultAnswerL3',async(req,res)=>{
    try {
        AnwWord1 = req.body.Aword1
        AnwWord2 = req.body.Aword2
        AnwWord3 = req.body.Aword3
        AnwWord4 = req.body.Aword4
        AnwWord5 =req.body.Aword5
        let answer = `${AnwWord1} ${AnwWord2} ${AnwWord3} ${AnwWord4} ${AnwWord5}`
        // console.log(autaAnswer)
        // console.log(answer)
        if(answer == autaAnswer){
                correctAnswerLevel3 = correctAnswerLevel3+1
        }
        if(mode ==1){
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/nextQ',async(req,res)=>{
    try {
        start =start+1
        res.redirect('/post/level1game')
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/level1game',async(req,res)=>{

    try {
        level1 =true
        if(correctAnswerLevel1 > totalQuestionLevel1) correctAnswerLevel1=0
        const find =await ThreeWordS.find({exerciseName:levelName.toLocaleLowerCase(),wordLength:3})
        totalQuestionLevel1=find.length
        const filter = find.slice(start,start+1)
        if(filter.length !=0){
            autaAnswer = filter[0].sentence
            res.render('level1.jade',{question:filter,level:start+1,mode})
        }else{
            start=0
            leve1Completed =true
            res.render('result.jade',{correct:correctAnswerLevel1,total:totalQuestionLevel1})
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/nextQLev2',async(req,res)=>{
    try {
        start =start+1
        res.redirect('/post/level2game')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/level2game',async(req,res)=>{
    try {
        level1 =false
        level2 =true
        correctAnswerLevel1=0
        totalQuestionLevel1=0
        if(correctAnswerLevel2 > totalQuestionLevel2) correctAnswerLevel2=0
        const find =await ThreeWordS.find({exerciseName:levelName.toLocaleLowerCase(),wordLength:4})
       
        totalQuestionLevel2=find.length
        const filter = find.slice(start,start+1)
        if(filter.length != 0){
            autaAnswer = filter[0].sentence
            res.render('level2.jade',{question:filter,level:start+1,mode})
        }else{
            start=0
            leve2Completed =true
            res.render('result.jade',{correct:correctAnswerLevel2,total:totalQuestionLevel2})
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/nextQLev3',async(req,res)=>{
    try {
        start =start+1
        res.redirect('/post/level3game')
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/level3game',async(req,res)=>{
    try {
        level1 =false
        level2 =true
        correctAnswerLevel1=0
        totalQuestionLevel1=0
        correctAnswerLevel2=0
        totalQuestionLevel2=0
        if(correctAnswerLevel3 > totalQuestionLevel3) correctAnswerLevel3=0
        const find =await ThreeWordS.find({exerciseName:levelName.toLocaleLowerCase(),wordLength:5})
        totalQuestionLevel3=find.length
        const filter = find.slice(start,start+1)
        if(filter.length != 0){
            autaAnswer = filter[0].sentence
            // console.log(autaAnswer)
            res.render('level3.jade',{question:filter,level:start+1,mode})
        }else{
            start=0
            leve2Completed =true
            res.render('result.jade',{correct:correctAnswerLevel3,total:totalQuestionLevel3})
        }
    } catch (error) {
        res.json(error.message)
    }
})

module.exports=app