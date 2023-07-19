const express = require('express')
const multer = require('multer')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')
const app = express()
app.use(cookieParser());
app.use(session({ secret: 'Your_Secret_Key', resave: true, saveUninitialized: true }))
const SchemaExercise = require('../Schema/exercise')
const ThreeWordS = require('../Schema/threeWordSchema')
const Result = require('../Schema/result')
const StudentDetail = require('../Schema/studentlogin')
const TeacherDetail = require('../Schema/teacherLogin')

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




app.get('/adminbtn', async (req, res) => {
    try {
        res.render('admin.jade')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/add', async (req, res) => {
    try {
        res.render('Add.jade', { myva: req.session.exerciseName })
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/exerciseName', async (req, res) => {
    try {
        res.render('exerciseName.jade')
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/login', async (req, res) => {
    try {
        res.render('adminLogin.jade')
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/loginChecking', async (req, res) => {
    try {
        req.session.existingExercise = ''
        req.session.exerciseName = ''
        req.session.idED = 0
        req.session.deleteExercise = ''
        req.session.emailId = req.body.email
        req.session.save()
        if (req.session.emailId == 'grkasthuri@enability.in') {
            // console.log('login')
            let bcrypts = await bcrypt.compare(req.body.password, '$2b$12$lqJgdLbacVFlBAh0nnddRO279WSlyW4f0Nk565vb5McMtrTcns31m')
            // console.log(bcrypts)
            if (bcrypts == false) {
                return res.json('Enter correct password')
            } else {
                res.json("done")
            }
        } else {
            return res.json('Enter correct email id')
        }
        // req.session.save()
        // res.json("done")
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/editanddelete', async (req, res) => {
    try {
        const find = await SchemaExercise.find({ email: req.session.emailId })
        const word = await ThreeWordS.find({ email: req.session.emailId })
        if (find.length == 0 || word.length == 0) {
            return res.json('No exercise')
        } else {
            return res.json('done')
        }
        // res.render('editAndDelete.jade', { exercisename: find })
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/getEditDelete', async (req, res) => {
    try {
        const find = await SchemaExercise.find({ email: req.session.emailId })
        res.render('editAndDelete.jade', { exercisename: find })
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/getting/exercise', async (req, res) => {
    try {

        // const find =await 
    } catch (error) {
        res.json(error.message)
    }
})


app.post('/editid', async (req, res) => {
    try {
        req.session.idED = req.body.id
        req.session.save()
        console.log(req.session.idED)
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/edit', async (req, res) => {
    try {
        const finding = await ThreeWordS.findOne({ _id: req.session.idED })
        // console.log(finding)
        if (finding.wordLength == 3) {
            console.log([finding])
            res.render('editing.jade', { edit: [finding], exnames: req.session.deleteExercise })
        } else if (finding.wordLength == 4) {
            res.render('editing4.jade', { edit: [finding], exnames: req.session.deleteExercise })
        } else if (finding.wordLength == 5) {
            res.render('editing5.jade', { edit: [finding], exnames: req.session.deleteExercise })
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/continue', async (req, res) => {
    try {
        const find = await ThreeWordS.find({ exerciseName: req.session.deleteExercise })
        // console.log(find)
        res.render('deleteORDelete.jade', { mydata: find, exnames: req.session.deleteExercise })
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/resultChecking', async (req, res) => {
    req.session.resultCheckingEx = req.body.exerciseName
    req.session.save()
    const find = await Result.find({ email: req.session.emailId, exerciseName: req.session.resultCheckingEx })
    if (find.length == 0) {
        return res.json('no')
    } else {
        return res.json('yes')
    }

})

app.get('/resultViewRoute', async (req, res) => {
    const find = await SchemaExercise.find({ email: req.session.emailId })
    res.render('resultView.jade', { exercisename: find })
})

app.get('/finalResult/checking', async (req, res) => {
    const result = await Result.find({ email: req.session.emailId, exerciseName: req.session.resultCheckingEx })
    return res.render('checking.jade', { data: result })
})

app.post('/exerciseDate', async (req, res) => {
    try {
        let word = req.body.name
        req.session.deleteExercise = word
        req.session.save()
        const find = await ThreeWordS.find({ email: req.session.emailId, exerciseName: req.session.deleteExercise })
        if (find.length == 0) {
            res.json('no')
        } else {
            res.json('yes')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/threeWord', async (req, res) => {
    try {
        res.render('AddThreeWords.jade', { data: req.session.exerciseName })
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/fourWord', async (req, res) => {
    try {
        res.render('AddFourWords.jade', { data: req.session.exerciseName })
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/fiveWord', async (req, res) => {
    try {
        res.render('AddFiveWords.jade', { data: req.session.exerciseName })
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/exerciseAdding', async (req, res) => {
    try {
        const create = await SchemaExercise.create(req.body)
        const find = await SchemaExercise.find()
        // console.log(find)
        res.redirect('/add')
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/threeworddata', upload.array('audioFiles', 3), async (req, res) => {
    const da = req.body;
    // console.log(da)
    const audioUrls = req.files.map(file => file.filename);
    // console.log(audioUrls)
    const find = await SchemaExercise.find()
    let wordCap = req.body.word1
    // req.body.word1 = wordCap.charAt(0).toUpperCase() + wordCap.slice(1)
    let megeringWord = `${req.body.word1} ${req.body.word2} ${req.body.word3}`
    const storingData = new ThreeWordS({
        exerciseName: req.session.exerciseName,
        email: req.session.emailId,
        wordLength: 3,
        sentence: megeringWord,
        Word1: req.body.word1,
        Word2: req.body.word2,
        Word3: req.body.word3,
        Audio1: audioUrls[0],
        Audio2: audioUrls[1],
        Audio3: audioUrls[2]
    })
    await storingData.save()
    // console.log(storingData)
    res.redirect('/post/threeWord')
})



app.post('/fourworddata', upload.array('audioFiles1', 4), async (req, res) => {
    const da = req.body;
    const audioUrls = req.files.map(file => file.filename);
    const find = await SchemaExercise.find()
    let wordCap = req.body.word1
    // req.body.word1 = wordCap.charAt(0).toUpperCase() + wordCap.slice(1)
    let megeringWord = `${req.body.word1} ${req.body.word2} ${req.body.word3} ${req.body.word4}`
    const storingData = new ThreeWordS({
        exerciseName: req.session.exerciseName,
        email: req.session.emailId,
        wordLength: 4,
        sentence: megeringWord,
        Word1: req.body.word1,
        Word2: req.body.word2,
        Word3: req.body.word3,
        Word4: req.body.word4,
        Audio1: audioUrls[0],
        Audio2: audioUrls[1],
        Audio3: audioUrls[2],
        Audio4: audioUrls[3]
    })
    await storingData.save()
    // console.log(audioUrls)
    res.redirect('/post/fourWord')
})



app.post('/fiveworddata', upload.array('audioFiles2', 5), async (req, res) => {
    const da = req.body;
    // console.log(da)
    const audioUrls = req.files.map(file => file.filename);
    const find = await SchemaExercise.find()
    let wordCap = req.body.word1
    // req.body.word1 = wordCap.charAt(0).toUpperCase() + wordCap.slice(1)
    let megeringWord = `${req.body.word1} ${req.body.word2} ${req.body.word3} ${req.body.word4} ${req.body.word5}`
    console.log(megeringWord)
    const storingData = new ThreeWordS({
        exerciseName: req.session.exerciseName,
        email: req.session.emailId,
        wordLength: 5,
        sentence: megeringWord,
        Word1: req.body.word1,
        Word2: req.body.word2,
        Word3: req.body.word3,
        Word4: req.body.word4,
        Word5: req.body.word5,
        Audio1: audioUrls[0],
        Audio2: audioUrls[1],
        Audio3: audioUrls[2],
        Audio4: audioUrls[3],
        Audio5: audioUrls[4]
    })
    await storingData.save()
    // console.log(storingData)
    res.redirect('/post/fiveWord')
})



app.post('/exerciseNameStoring', async (req, res) => {
    try {
        // console.log(req.session.emailId)
        let name = req.body.input
        if (name != '') {
            // console.log(req.body)
            req.session.exerciseName = name
            req.session.save()
            // word=myData
            const find = await SchemaExercise.findOne({ exerciseName: req.body.input, email: req.session.emailId })
            // console.log(req.body)
            if (!find) {
                const create = await SchemaExercise.create({ exerciseName: req.body.input, email: req.session.emailId })
                create.save()
                // console.log('exercise name')
            }
        }
    } catch (error) {
        res.json(error)
    }
})



app.get('/threeworddataget', async (req, res) => {
    try {
        res.render()
    } catch (error) {

    }
})

app.get('/delete', async (req, res) => {
    try {
        res.redirect('/post/continue')
    } catch (error) {

    }
})

app.delete('/deleteex', async (req, res) => {
    try {
        req.session.deleteExId = req.body.id
        req.session.save()
        const delelting = await ThreeWordS.deleteOne({ _id: req.session.deleteExId })
        const find = await ThreeWordS.find({ email: req.session.emailId, exerciseName: req.session.deleteExercise })
        if (find.length == 0) {
            res.json('deleted No exercise')
        } else {
            res.json('deleted')
        }

    } catch (error) {
        res.json(error.message)
    }
})


app.post('/editThree', upload.array("audioEdit", 3), async (req, res) => {
    try {

        const audioUrls = req.files.map(file => file.filename)

        const findingEx = await ThreeWordS.findOne({ _id: req.session.idED })

        let Word1 = req.body.Word1
        let Word2 = req.body.Word2
        let Word3 = req.body.Word3
        let sentence = `${Word1} ${Word2} ${Word3}`
        req.body.sentence = sentence
        req.body.exerciseName = findingEx.exerciseName
        req.body.wordLength = findingEx.wordLength
        req.body.email = findingEx.email
        req.body.password = findingEx.password
        if (findingEx.Word1 != req.body.Word1 || findingEx.Word2 != req.body.Word2 || findingEx.Word3 != req.body.Word3) {
            // console.log('inside')
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3) {
                req.body.Word1 = Word1
                req.body.Word2 = Word2
                req.body.Word3 = Word3
                req.body.Audio1 = audioUrls[0]
                req.body.Audio2 = audioUrls[1]
                req.body.Audio3 = audioUrls[2]
            }
            else if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]

            }
            else if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
            }
            else if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
            }
            else if (findingEx.Word1 != Word1) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
            }
            else if (findingEx.Word2 != Word2) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
            }
            else if (findingEx.Word3 != Word3) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
            }
        }
        const update = await ThreeWordS.updateOne({ _id: findingEx._id }, req.body)
        // console.log(update)
        res.redirect('/post/continue')

    } catch (error) {
        res.json(error.message)
    }
})




app.post('/editFour', upload.array("audioEdit", 4), async (req, res) => {
    try {

        const audioUrls = req.files.map(file => file.filename)
        // console.log(audioUrls)
        const findingEx = await ThreeWordS.findOne({ _id: req.session.idED })

        let Word1 = req.body.Word1
        let Word2 = req.body.Word2
        let Word3 = req.body.Word3
        let Word4 = req.body.Word4
        let sentence = `${Word1} ${Word2} ${Word3} ${Word4}`
        req.body.sentence = sentence
        req.body.exerciseName = findingEx.exerciseName
        req.body.wordLength = findingEx.wordLength
        req.body.email = findingEx.email
        req.body.password = findingEx.password
        if (findingEx.Word1 != req.body.Word1 || findingEx.Word2 != req.body.Word2 || findingEx.Word3 != req.body.Word3 || findingEx.Word4 != req.body.Word4) {
            // console.log('inside')
            if (findingEx.Word1 != Word1) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
            }
            if (findingEx.Word2 != Word2) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
            }
            if (findingEx.Word3 != Word3) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
            }
            if (findingEx.Word4 != Word4) {
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[0]
            }

            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]

            }
            if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1]
            }
            if (findingEx.Word2 != Word2 && findingEx.Word4 != Word4) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1]
            }
            if (findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[2]

            }
            if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
                // console.log('comming')
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word4 != Word4) {
                // console.log('comming')
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Word2 = Word2
                req.body.Word3 = Word3
                req.body.Word4 = Word4
                req.body.Audio1 = audioUrls[0]
                req.body.Audio2 = audioUrls[1]
                req.body.Audio3 = audioUrls[2]
                req.body.Audio4 = audioUrls[3]
            }

        }
        // console.log(req.body)
        const update = await ThreeWordS.updateOne({ _id: findingEx._id }, req.body)
        // update.save()
        res.redirect('/post/continue')

    } catch (error) {
        res.json(error.message)
    }
})





app.post('/editFive', upload.array("audioEdit", 5), async (req, res) => {
    try {

        const audioUrls = req.files.map(file => file.filename)
        // console.log(audioUrls)
        const findingEx = await ThreeWordS.findOne({ _id: req.session.idED })

        let Word1 = req.body.Word1
        let Word2 = req.body.Word2
        let Word3 = req.body.Word3
        let Word4 = req.body.Word4
        let Word5 = req.body.Word5
        let sentence = `${Word1} ${Word2} ${Word3} ${Word4} ${Word5}`
        req.body.sentence = sentence
        req.body.exerciseName = findingEx.exerciseName
        req.body.wordLength = findingEx.wordLength
        req.body.email = findingEx.email
        req.body.password = findingEx.password
        if (findingEx.Word1 != req.body.Word1 || findingEx.Word2 != req.body.Word2 || findingEx.Word3 != req.body.Word3 || findingEx.Word4 != req.body.Word4 || findingEx.Word5 != req.body.Word5) {
            // console.log('inside')
            if (findingEx.Word1 != Word1) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
            }
            if (findingEx.Word2 != Word2) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
            }
            if (findingEx.Word3 != Word3) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
            }
            if (findingEx.Word4 != Word4) {
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[0]
            }
            if (findingEx.Word5 != Word5) {
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[0]
            }

            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]

            }
            if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]

            }
            if (findingEx.Word1 != Word1 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1]
            }
            if (findingEx.Word2 != Word2 && findingEx.Word4 != Word4) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1]
            }
            if (findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[1]
            }
            if (findingEx.Word2 != Word2 && findingEx.Word5 != Word5) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[1]
            }

            if (findingEx.Word3 != Word3 && findingEx.Word5 != Word5) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[1]
            }
            if (findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[0]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[1]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[2]

            }
            if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1] //
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1] //
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1] //
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[2]
            }
            if (findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1] //
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[2]
            }
            if (findingEx.Word2 != Word2 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[1] //
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[2]
            }
            if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word5 != Word5) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1] //
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1] //
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[2]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[2]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[3]

            }
            if (findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[3]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[1]
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[3]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1] //
                req.body.Word4 = Word4
                req.body.Audio4 = audioUrls[2]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[3]
            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Audio1 = audioUrls[0]
                req.body.Word2 = Word2
                req.body.Audio2 = audioUrls[1]
                req.body.Word3 = Word3
                req.body.Audio3 = audioUrls[2]
                req.body.Word5 = Word5
                req.body.Audio5 = audioUrls[3]

            }
            if (findingEx.Word1 != Word1 && findingEx.Word2 != Word2 && findingEx.Word3 != Word3 && findingEx.Word4 != Word4 && findingEx.Word5 != Word5) {
                req.body.Word1 = Word1
                req.body.Word2 = Word2
                req.body.Word3 = Word3
                req.body.Word4 = Word4
                req.body.Word5 = Word5
                req.body.Audio1 = audioUrls[0]
                req.body.Audio2 = audioUrls[1]
                req.body.Audio3 = audioUrls[2]
                req.body.Audio4 = audioUrls[3]
                req.body.Audio5 = audioUrls[4]
            }
        }
        // console.log(req.body)
        const update = await ThreeWordS.updateOne({ _id: findingEx._id }, req.body)
        // update.save()
        // console.log(update)
        res.redirect('/post/continue')

    } catch (error) {
        res.json(error.message)
    }
})

app.get('/addexercisetoexisting', async (req, res) => {
    try {
        const find = await SchemaExercise.find({ email: req.session.emailId })

        res.render('addexisting.jade', { exercisename: find })
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/ToExisiting', async (req, res) => {
    try {
        req.session.existingExercise = req.body.name
        req.session.exerciseName = existingExercise
        req.session.save()
        // res.render('QuestionToExisting',{exname:req.body.exercise})
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/addingQToNew', async (req, res) => {
    try {
        res.render('QuestionToExisting', { exname: req.session.existingExercise })
    } catch (error) {
        res.json(error.message)
    }
})



// student

app.get('/studentLogin', async (req, res) => {
    try {
        res.render('studentLogin.jade')
    } catch (error) {
        res.json(error.message)
    }
})

app.post('/studentAdminEmailID', async (req, res) => {
    try {
        req.session.leve1Completed = false
        req.session.leve2Completed = false
        req.session.leve3Completed = false
        req.session.correctAnswerLevel1 = 0
        req.session.totalQuestionLevel1 = 0
        req.session.correctAnswerLevel2 = 0
        req.session.totalQuestionLevel2 = 0
        req.session.correctAnswerLevel3 = 0
        req.session.totalQuestionLevel3 = 0
        req.session.autaAnswer = ""
        req.session.mode = 0
        req.session.start = 0
        req.session.AnwWord1 = ''
        req.session.AnwWord2 = ''
        req.session.AnwWord3 = ''
        req.session.AnwWord4 = ''
        req.session.AnwWord5 = ''
        req.session.emailOfStLo = req.body.email
        req.session.username = req.body.username
        req.session.new = true
        req.session.save()
        const find = await ThreeWordS.findOne({ email: req.body.email })
        if (req.session.emailOfStLo == 'grkasthuri@enability.in') {
            if (req.session.username !== 'Jeyson') {
                return res.json('User name is worng')
            }
            req.session.save()
            return res.json("done")
        } else {
            return res.json('Email id is not exist')
        }
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/student', async (req, res) => {
    try {
        const find = await SchemaExercise.find({ email: req.session.emailOfStLo })
        req.session.new = true
        req.session.save()
        res.render('studentLanding.jade', { exercisename: find })
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/level', async (req, res) => {
    try {
        // console.log(req.session.levelName)
        req.session.correctAnswerLevel1 = 0
        req.session.totalQuestionLevel1 = 0
        req.session.correctAnswerLevel2 = 0
        req.session.totalQuestionLevel2 = 0
        req.session.correctAnswerLevel3 = 0
        req.session.totalQuestionLevel3 = 0
        req.session.save()

        const find = await Result.findOne({ username: req.session.username, exerciseName: req.session.levelName })
        // console.log(find)
        if (find == null) {
            const idadd = await Result.create({
                username: req.session.username,
                exerciseName: req.session.levelName,
                email: req.session.emailOfStLo,
                level1: 'Not taken',
                level2: 'Not taken',
                level3: 'Not taken'
            })
            req.session.leve1Completed = false
            req.session.leve2Completed = false
            req.session.leve3Completed = false
            req.session.save()
        }else{
            if (find.level1 == "Not taken" || find.level1 == "Not completed") {
                // req.session.leve1Completed = false
                req.session.leve2Completed = false
                req.session.leve3Completed = false
                req.session.save()
            } else if (find.level1 == "Completed") {
                // console.log('level 1 completed')
                req.session.leve1Completed = true
                req.session.save()
            }
    
            if (find.level2 == "Not taken" || find.level2 == "Not completed") {
                // req.session.leve1Completed = false
                req.session.leve2Completed = false
                req.session.leve3Completed = false
                req.session.save()
            } else if (find.level2 == "Completed" && find.level1 == "Completed") {
                req.session.leve2Completed = true
                req.session.save()
            }
        }
        res.render('levelsSelecting.jade', { name: req.session.levelName, level1: req.session.leve1Completed, level2: req.session.leve2Completed, level3: req.session.leve3Completed, mode: req.session.mode })
    } catch (error) {
        res.json(error)
    }
})



app.post('/levelValue', async (req, res) => {
    try {
        // console.log(req.body)
        req.session.levelName = req.body.name
        req.session.save()
        if (req.body.Mode == "Scan") {
            req.session.mode = 1
            req.session.save()
        } else {
            req.session.mode = 0
            req.session.save()
        }
        const find = await ThreeWordS.find({ email: req.session.emailOfStLo, exerciseName: req.session.levelName })
        // console.log(find , "new")
        if (find.length != 0) {
            return res.json('yes')
        } else {
            return res.json('no')
        }
    } catch (error) {
        res.json(error.message)
    }
})


app.post('/level1TorF', async (req, res) => {
    try {
        // console.log('comoming',req.body.name)
        if (!req.session.leve1Completed) {
            // console.log('comoming')
            res.json('please complete level 1')
        }
    } catch (error) {
        res.json(error.message)
    }
})


app.post('/level2TorF', async (req, res) => {
    try {
        if (!req.session.leve1Completed || !req.session.leve2Completed) {

            if (!req.session.leve1Completed && !req.session.leve2Completed) {

                res.json('please complete level 1 and level 2')

            } else if (!req.session.leve1Completed) {
                res.json('please complete level 1')

            } else {
                res.json('please complete level 2')
            }
        }
    } catch (error) {
        res.json(error.message)
    }
})




app.post('/resultAnswerL1', async (req, res) => {
    try {
        req.session.AnwWord1 = req.body.Aword1
        req.session.AnwWord2 = req.body.Aword2
        req.session.AnwWord3 = req.body.Aword3

        req.session.answer = `${req.session.AnwWord1} ${req.session.AnwWord2} ${req.session.AnwWord3}`
        req.session.save()
        if (req.session.answer == req.session.autaAnswer) {
            req.session.correctAnswerLevel1 = req.session.correctAnswerLevel1 + 1
            req.session.save()
        }
        if (req.session.mode == 1) {
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/resultAnswerL2', async (req, res) => {
    try {
        req.session.AnwWord1 = req.body.Aword1
        req.session.AnwWord2 = req.body.Aword2
        req.session.AnwWord3 = req.body.Aword3
        req.session.AnwWord4 = req.body.Aword4
        // console.log(req.body) 
        req.session.answer = `${req.session.AnwWord1} ${req.session.AnwWord2} ${req.session.AnwWord3} ${req.session.AnwWord4}`
        req.session.save()
        if (req.session.answer == req.session.autaAnswer) {
            req.session.correctAnswerLevel2 = req.session.correctAnswerLevel2 + 1
            req.session.save()
        }
        if (req.session.mode == 1) {
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/resultAnswerL3', async (req, res) => {
    try {
        req.session.AnwWord1 = req.body.Aword1
        req.session.AnwWord2 = req.body.Aword2
        req.session.AnwWord3 = req.body.Aword3
        req.session.AnwWord4 = req.body.Aword4
        req.session.AnwWord5 = req.body.Aword5
        req.session.answer = `${req.session.AnwWord1} ${req.session.AnwWord2} ${req.session.AnwWord3} ${req.session.AnwWord4} ${req.session.AnwWord5}`
        req.session.save()
        // console.log(autaAnswer)
        // console.log(answer)
        if (req.session.answer == req.session.autaAnswer) {
            req.session.correctAnswerLevel3 = req.session.correctAnswerLevel3 + 1
            req.session.save()
        }
        if (req.session.mode == 1) {
            res.json('done')
        }
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/nextQ', async (req, res) => {
    try {
        req.session.start = req.session.start + 1
        req.session.save()
        res.redirect('/post/level1game')
    } catch (error) {
        res.json(error.message)
    }
})




app.get('/level1game', async (req, res) => {

    try {
        // level1 =true
        if (req.session.correctAnswerLevel1 > req.session.totalQuestionLevel1) {
            req.session.correctAnswerLevel1 = 0
            req.session.save()
        }
        let m = req.session.levelName
        const find = await ThreeWordS.find({ exerciseName: req.session.levelName, wordLength: 3, email: req.session.emailOfStLo })
        // console.log(find)
        if (find.length == 0) {
            req.session.leve1Completed = true
            req.session.save()
            return res.render('levelnotavai.jade', { level: 'Level 1 is not available for this exercise', mode: req.session.mode })
        }
        req.session.totalQuestionLevel1 = find.length
        const filter = find.slice(req.session.start, req.session.start + 1)
        if (filter.length != 0) {
            req.session.autaAnswer = filter[0].sentence
            req.session.save()
            res.render('level1.jade', { question: filter, level: req.session.start + 1, mode: req.session.mode })
        } else {
            req.session.start = 0
            req.session.leve1Completed = true
            req.session.save()
            if (req.session.correctAnswerLevel1 == req.session.totalQuestionLevel1) {
                const update = await Result.updateOne({ username: req.session.username, exerciseName: req.session.levelName }, {
                    level1: 'Completed'
                })

            } else {
                const update = await Result.updateOne({ username: req.session.username, exerciseName: req.session.levelName }, {
                    level1: 'Not completed'
                })
            }
            // req.session.save()
            res.render('result.jade', { correct: req.session.correctAnswerLevel1, total: req.session.totalQuestionLevel1, mode: req.session.mode })
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/nextQLev2', async (req, res) => {
    try {
        req.session.start = req.session.start + 1
        req.session.save()
        res.redirect('/post/level2game')
    } catch (error) {
        res.json(error.message)
    }
})



app.get('/level2game', async (req, res) => {
    try {
        // level1 =false
        // level2 =true
        req.session.correctAnswerLevel1 = 0
        req.session.totalQuestionLevel1 = 0
        req.session.save()
        if (req.session.correctAnswerLevel2 > req.session.totalQuestionLevel2) {
            req.session.correctAnswerLevel2 = 0
            req.session.save()
        }
        let m = req.session.levelName
        const find = await ThreeWordS.find({ exerciseName: req.session.levelName, wordLength: 4, email: req.session.emailOfStLo })
        // console.log(find)
        if (find.length == 0) {
            console.log('level2 not')
            req.session.leve2Completed = true
            req.session.save()
            return res.render('levelnotavai.jade', { level: 'Level 2 is not available for this exercise', mode: req.session.mode })
        }
        req.session.totalQuestionLevel2 = find.length
        req.session.save()
        const filter = find.slice(req.session.start, req.session.start + 1)
        if (filter.length != 0) {
            req.session.autaAnswer = filter[0].sentence
            req.session.save()
            res.render('level2.jade', { question: filter, level: req.session.start + 1, mode: req.session.mode })
        } else {
            req.session.start = 0
            req.session.leve2Completed = true
            req.session.save()
            if (req.session.correctAnswerLevel2 == req.session.totalQuestionLevel2) {
                const update = await Result.updateOne({ username: req.session.username, exerciseName: req.session.levelName }, {
                    level2: 'Completed'
                })
            } else {
                const update = await Result.updateOne({ username: req.session.username, exerciseName: req.session.levelName }, {
                    level2: 'Not completed'
                })
            }
            res.render('result.jade', { correct: req.session.correctAnswerLevel2, total: req.session.totalQuestionLevel2, mode: req.session.mode })
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/nextQLev3', async (req, res) => {
    try {
        req.session.start = req.session.start + 1
        res.redirect('/post/level3game')
    } catch (error) {
        res.json(error.message)
    }
})


app.get('/level3game', async (req, res) => {
    try {
        // level1 =false
        // level2 =true
        req.session.correctAnswerLevel1 = 0
        req.session.totalQuestionLevel1 = 0
        req.session.correctAnswerLevel2 = 0
        req.session.totalQuestionLevel2 = 0
        req.session.save()
        if (req.session.correctAnswerLevel3 > req.session.totalQuestionLevel3) {
            req.session.correctAnswerLevel3 = 0
            req.session.save()
        }
        let m = req.session.levelName
        const find = await ThreeWordS.find({ exerciseName: req.session.levelName, wordLength: 5, email: req.session.emailOfStLo })
        if (find.length == 0) {
            req.session.leve3Completed = true
            req.session.save()
            return res.render('levelnotavai.jade', { level: 'Level 3 is not available for this exercise', mode: req.session.mode })
        }
        req.session.totalQuestionLevel3 = find.length
        req.session.save()
        const filter = find.slice(req.session.start, req.session.start + 1)
        if (filter.length != 0) {
            req.session.autaAnswer = filter[0].sentence
            // console.log(autaAnswer)
            req.session.save()
            if (req.session.correctAnswerLevel3 == req.session.totalQuestionLevel3) {
                const update = await Result.updateOne({ username: req.session.username, exerciseName: req.session.levelName }, {
                    level3: 'Completed'
                })
            } else {
                const update = await Result.updateOne({ username: req.session.username, exerciseName: req.session.levelName }, {
                    level3: 'Not completed'
                })
            }
            res.render('level3.jade', { question: filter, level: req.session.start + 1, mode: req.session.mode })
        } else {
            req.session.start = 0
            req.session.save()
            res.render('result.jade', { correct: req.session.correctAnswerLevel3, total: req.session.totalQuestionLevel3, mode: req.session.mode })
        }
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/about/enabilty', async (req, res) => {
    try {
        return res.render('about.jade')
    } catch (error) {
        return res.json(error.message)
    }
})

app.get('/finalResult', async (req, res) => {
    const result = await Result.find({ email: req.session.emailId })
    console.log(result)
    if (result.length == 0) {
        return res.json('Results Are Not Available')
    } else {
        return res.json('yes')
    }
})

module.exports = app