let inp = document.querySelector('#exercise')
let wor1 = document.querySelector('.word-1')
let ans1 = document.querySelector('.answer-1')
let wor2 = document.querySelector('.word-2')
let ans2 = document.querySelector('.answer-2')
let wor3 = document.querySelector('.word-3')
let ans3 = document.querySelector('.answer-3')
let wor4 = document.querySelector('.word-4')
let ans4 = document.querySelector('.answer-4')
let wor5 = document.querySelector('.word-5')
let ans5 = document.querySelector('.answer-5')

function submit(sub, reag) {
    if (reag == "yellow") {
        location.reload();
    } else {
        let word1;
        let word2;
        let word3;
        let word4;
        let word5;
        let urlP;
        let dataW;
        let replaceLoction;
        if(ans4 ==null){
            word1 = document.querySelector('.answer-1').innerHTML
            word2 = document.querySelector('.answer-2').innerHTML
            word3 = document.querySelector('.answer-3').innerHTML
            urlP="/post/resultAnswerL1"
            dataW={ Aword1: word1, Aword2: word2, Aword3: word3 }
            replaceLoction='/post/nextQ'
        }else if(ans5 ==null){
            word1 = document.querySelector('.answer-1').innerHTML
            word2 = document.querySelector('.answer-2').innerHTML
            word3 = document.querySelector('.answer-3').innerHTML
            word4 = document.querySelector('.answer-4').innerHTML
            urlP="/post/resultAnswerL2"
            dataW={ Aword1: word1, Aword2: word2, Aword3: word3, Aword4: word4 }
            replaceLoction='/post/nextQLev2'
        }else{
            word1 = document.querySelector('.answer-1').innerHTML
            word2 = document.querySelector('.answer-2').innerHTML
            word3 = document.querySelector('.answer-3').innerHTML
            word4 = document.querySelector('.answer-4').innerHTML
            word5 = document.querySelector('.answer-5').innerHTML
            urlP="/post/resultAnswerL3"
            dataW={ Aword1: word1, Aword2: word2, Aword3: word3, Aword4: word4, Aword5: word5 }
            replaceLoction='/post/nextQLev3'
        }   
        $.ajax({
            url: urlP,
            method: "POST",
            data: dataW,
            success: function (response) {
                location.replace(replaceLoction)
                console.log(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

}

function onclicking() {
    let suRcunt = 0
    let sub1 = setInterval(() => {
        if (suRcunt == 0) {
            document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor = 'yellow'
            document.querySelectorAll(".answerSuAndRe")[0].style.color = 'black'
            document.querySelectorAll(".answerSuAndRe")[1].style.backgroundColor = '#2512b0'
            document.querySelectorAll(".answerSuAndRe")[1].style.color = 'white'
            suRcunt++
        } else if (suRcunt == 1) {
            document.querySelectorAll(".answerSuAndRe")[1].style.backgroundColor = 'yellow'
            document.querySelectorAll(".answerSuAndRe")[1].style.color = 'black'
            document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor = '#2512b0'
            document.querySelectorAll(".answerSuAndRe")[0].style.color = 'white'
            suRcunt = 0
        }
    }, 1500)


    document.addEventListener("click", () => {
        clearInterval(sub1);
        let one = document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor
        let two = document.querySelectorAll(".answerSuAndRe")[1].style.backgroundColor
        submit(one, two)
    })
}



function level() {
    if (ans4 == null) {
        let modes = document.querySelector(".modeCapture").innerHTML
        for (let i = 0; i < 2; i++) {
            document.querySelectorAll(".answerSuAndRe")[i].removeAttribute("href")
        }
        let p1 = document.querySelectorAll(".modeScan")[0].classList[0]
        let p2 = document.querySelectorAll(".modeScan")[1].classList[0]
        let p3 = document.querySelectorAll(".modeScan")[2].classList[0]
        let cunt = 0
        let intervel = setInterval(function () {
            if (cunt == 0) {
                let v = document.querySelector(`.${p1}`)
                v.style.backgroundColor = "yellow"
                let pv = document.querySelector(`.${p3}`)
                pv.style.backgroundColor = "#b1e1f4"
                cunt++
            } else if (cunt == 1) {
                let pV = document.querySelector(`.${p1}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p2}`)
                v.style.backgroundColor = "yellow"
                cunt++
            } else if (cunt == 2) {
                let pV = document.querySelector(`.${p2}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p3}`)
                v.style.backgroundColor = "yellow"
                cunt = 0
            }
        }, 1500);


        document.addEventListener("click", () => {

            let p1Color = document.querySelectorAll(".modeScan")[0].style.backgroundColor
            let p2Color = document.querySelectorAll(".modeScan")[1].style.backgroundColor
            let p3Color = document.querySelectorAll(".modeScan")[2].style.backgroundColor
            

            if (p1Color == "yellow") {
                console.log('p1')
                let audio1 = document.querySelector('.audio1')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    console.log(wor1.innerHTML)
                    ans1.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                else if (wor1.innerHTML != " ") {
                    ans3.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " ") {
                    wor1.style.backgroundColor = '#b1e1f4'
                } else {
                    clearInterval(intervel);
                    wor1.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }

            } else if (p2Color == 'yellow') {
                let audio1 = document.querySelector('.audio2')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                else if (wor2.innerHTML != " ") {
                    ans3.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " ") {
                    wor2.style.backgroundColor = '#b1e1f4'
                } else {
                    clearInterval(intervel);
                    wor2.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            } else if (p3Color == 'yellow') {
                let audio1 = document.querySelector('.audio3')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                else if (wor3.innerHTML != " ") {
                    console.log(wor3.innerHTML)
                    ans3.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " ") {
                    wor3.style.backgroundColor = '#b1e1f4'
                } else {
                    clearInterval(intervel);
                    wor3.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            }
        })
    } else if (ans5 == null) {
        for (let i = 0; i < 2; i++) {
            document.querySelectorAll(".answerSuAndRe")[i].removeAttribute("href")
        }
        let p1 = document.querySelectorAll(".modeScan")[0].classList[0]
        let p2 = document.querySelectorAll(".modeScan")[1].classList[0]
        let p3 = document.querySelectorAll(".modeScan")[2].classList[0]
        let p4 = document.querySelectorAll(".modeScan")[3].classList[0]

        let cunt = 0
        let intervel = setInterval(function () {
            if (cunt == 0) {
                let v = document.querySelector(`.${p1}`)
                v.style.backgroundColor = "yellow"
                let pv = document.querySelector(`.${p4}`)
                pv.style.backgroundColor = "#b1e1f4"
                cunt++
            } else if (cunt == 1) {
                let pV = document.querySelector(`.${p1}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p2}`)
                v.style.backgroundColor = "yellow"
                cunt++
            } else if (cunt == 2) {
                let pV = document.querySelector(`.${p2}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p3}`)
                v.style.backgroundColor = "yellow"
                cunt++
            } else if (cunt == 3) {
                let pV = document.querySelector(`.${p3}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p4}`)
                v.style.backgroundColor = "yellow"
                cunt = 0
            }
        }, 1500);

        document.addEventListener("click", () => {

            let p1Color = document.querySelectorAll(".modeScan")[0].style.backgroundColor
            let p2Color = document.querySelectorAll(".modeScan")[1].style.backgroundColor
            let p3Color = document.querySelectorAll(".modeScan")[2].style.backgroundColor
            let p4Color = document.querySelectorAll(".modeScan")[3].style.backgroundColor
            

            if (p1Color == "yellow") {
                console.log('p1')
                let audio1 = document.querySelector('.audio1')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    console.log(wor1.innerHTML)
                    ans1.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {
                    ans3.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                } else if (wor1.innerHTML != " ") {
                    ans4.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " ") {
                    wor1.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor1.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }

            } else if (p2Color == 'yellow') {
                let audio1 = document.querySelector('.audio2')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {
                    ans3.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                } else if (wor2.innerHTML != " ") {
                    ans4.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " ") {
                    wor2.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);

                    wor2.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            } else if (p3Color == 'yellow') {
                let audio1 = document.querySelector('.audio3')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {

                    ans3.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                } else if (wor3.innerHTML != " ") {
                    ans4.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " ") {
                    wor3.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor3.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            } else if (p4Color == "yellow") {
                let audio1 = document.querySelector('.audio4')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {

                    ans3.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                } else if (wor4.innerHTML != " ") {
                    ans4.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                }

                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " ") {
                    wor4.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor4.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            }
        })
    } else {
        for (let i = 0; i < 2; i++) {
            document.querySelectorAll(".answerSuAndRe")[i].removeAttribute("href")
        }
        let p1 = document.querySelectorAll(".modeScan")[0].classList[0]
        let p2 = document.querySelectorAll(".modeScan")[1].classList[0]
        let p3 = document.querySelectorAll(".modeScan")[2].classList[0]
        let p4 = document.querySelectorAll(".modeScan")[3].classList[0]
        let p5 = document.querySelectorAll(".modeScan")[4].classList[0]

        let cunt = 0
        let intervel = setInterval(function () {
            if (cunt == 0) {
                let v = document.querySelector(`.${p1}`)
                v.style.backgroundColor = "yellow"
                let pv = document.querySelector(`.${p5}`)
                pv.style.backgroundColor = "#b1e1f4"
                cunt++
            } else if (cunt == 1) {
                let pV = document.querySelector(`.${p1}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p2}`)
                v.style.backgroundColor = "yellow"
                cunt++
            } else if (cunt == 2) {
                let pV = document.querySelector(`.${p2}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p3}`)
                v.style.backgroundColor = "yellow"
                cunt++
            } else if (cunt == 3) {
                let pV = document.querySelector(`.${p3}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p4}`)
                v.style.backgroundColor = "yellow"
                cunt++
            } else if (cunt == 4) {
                let pV = document.querySelector(`.${p4}`)
                pV.style.backgroundColor = "#b1e1f4"
                let v = document.querySelector(`.${p5}`)
                v.style.backgroundColor = "yellow"
                cunt = 0
            }
        }, 1500);

        document.addEventListener("click", () => {

            let p1Color = document.querySelectorAll(".modeScan")[0].style.backgroundColor
            let p2Color = document.querySelectorAll(".modeScan")[1].style.backgroundColor
            let p3Color = document.querySelectorAll(".modeScan")[2].style.backgroundColor
            let p4Color = document.querySelectorAll(".modeScan")[3].style.backgroundColor
            let p5Color = document.querySelectorAll(".modeScan")[4].style.backgroundColor
            

            if (p1Color == "yellow") {
                console.log('p1')
                let audio1 = document.querySelector('.audio1')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    console.log(wor1.innerHTML)
                    ans1.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {
                    ans3.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                } else if (ans4.innerHTML == ' ') {
                    ans4.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                } else if (wor1.innerHTML != " ") {
                    ans5.innerHTML = wor1.innerHTML
                    wor1.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " " || ans5.innerHTML == " ") {
                    wor1.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor1.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }

            } else if (p2Color == 'yellow') {
                let audio1 = document.querySelector('.audio2')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {
                    ans3.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                } else if (ans4.innerHTML == ' ') {
                    ans4.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                } else if (wor2.innerHTML != " ") {
                    ans5.innerHTML = wor2.innerHTML
                    wor2.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " " || ans5.innerHTML == " ") {
                    wor2.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);

                    wor2.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            } else if (p3Color == 'yellow') {
                let audio1 = document.querySelector('.audio3')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {

                    ans3.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                } else if (ans4.innerHTML == ' ') {
                    ans4.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                } else if (wor3.innerHTML != " ") {
                    ans5.innerHTML = wor3.innerHTML
                    wor3.innerHTML = " "
                }
                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " " || ans5.innerHTML == " ") {
                    wor3.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor3.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            } else if (p4Color == "yellow") {
                let audio1 = document.querySelector('.audio4')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {
                    ans3.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                } else if (ans4.innerHTML == ' ') {
                    ans4.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                } else if (wor4.innerHTML != " ") {
                    ans5.innerHTML = wor4.innerHTML
                    wor4.innerHTML = " "
                }

                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " " || ans5.innerHTML == " ") {
                    wor4.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor4.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            } else if (p5Color == "yellow") {
                let audio1 = document.querySelector('.audio4')
                audio1.play()
                if (ans1.innerHTML == ' ') {
                    ans1.innerHTML = wor5.innerHTML
                    wor5.innerHTML = " "
                }
                else if (ans2.innerHTML == ' ') {
                    ans2.innerHTML = wor5.innerHTML
                    wor5.innerHTML = " "
                }
                else if (ans3.innerHTML == ' ') {
                    ans3.innerHTML = wor5.innerHTML
                    wor5.innerHTML = " "
                } else if (ans4.innerHTML == ' ') {
                    ans4.innerHTML = wor5.innerHTML
                    wor5.innerHTML = " "
                } else if (wor5.innerHTML != " ") {
                    ans5.innerHTML = wor5.innerHTML
                    wor5.innerHTML = " "
                }

                if (ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " " || ans4.innerHTML == " " || ans5.innerHTML == " ") {
                    wor5.style.backgroundColor = '#b1e1f4'

                } else {
                    clearInterval(intervel);
                    wor5.style.backgroundColor = '#b1e1f4'
                    onclicking()
                }
            }
        })
    }
}
level()
