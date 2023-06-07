
    for(let i=0;i<2;i++){
        document.querySelectorAll(".answerSuAndRe")[i].removeAttribute("href")
    }
    let p1 = document.querySelectorAll(".modeScan")[0].classList[0]
    let p2 = document.querySelectorAll(".modeScan")[1].classList[0]
    let p3 = document.querySelectorAll(".modeScan")[2].classList[0]
    
    function timeouts(){
        
        let time1 = setTimeout(()=>{
            let v =document.querySelector(`.${p1}`)
            v.style.backgroundColor = "yellow"
            let pv =document.querySelector(`.${p3}`)
            pv.style.backgroundColor = "#b1e1f4"
            
        }, 1000)
    
        let time2 = setTimeout(()=>{
            clearTimeout(time1)
            let pV =document.querySelector(`.${p1}`)
            pV.style.backgroundColor = "#b1e1f4"
            let v =document.querySelector(`.${p2}`)
            v.style.backgroundColor = "yellow"
        }, 2000)
        
        var time3 = setTimeout(()=>{
            clearTimeout(time1)
            let pV =document.querySelector(`.${p2}`)
            pV.style.backgroundColor = "#b1e1f4"
            let v =document.querySelector(`.${p3}`)
            v.style.backgroundColor = "yellow"
        }, 3000)
        document.addEventListener ("click",()=>{
            clearTimeout(time1);
            clearTimeout(time2);
            clearTimeout(time3);
        })
        
    }
    
    timeouts()
    
    let intervel = setInterval(function () {timeouts()}, 4000);
    
    //- console.log(document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor='red')
    
    document.addEventListener ("click",()=>{
        clearInterval(intervel);
        let p1Color =document.querySelectorAll(".modeScan")[0].style.backgroundColor
        let p2Color =document.querySelectorAll(".modeScan")[1].style.backgroundColor
        let p3Color =document.querySelectorAll(".modeScan")[2].style.backgroundColor
        function submit(sub,reag){
            if(reag =="yellow"){
                location.reload();
            }else{
                let word1 = document.querySelector('.answer-1').innerHTML
                let word2 = document.querySelector('.answer-2').innerHTML
                let word3 = document.querySelector('.answer-3').innerHTML
                $.ajax({
                    url: "/post/resultAnswerL1",
                    method: "POST",
                    data: {Aword1: word1,Aword2:word2,Aword3:word3 },
                    success: function(response) {
                        location.replace('/post/nextQ')
                        console.log(response);
                    },
                    error: function(err) {
                    console.log(err);
                    }
                });
            }
            
        }
    
        function onclicking(){
            let sub1 =setInterval(()=>{
                document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor='yellow'
                document.querySelectorAll(".answerSuAndRe")[0].style.color='black'
                document.querySelectorAll(".answerSuAndRe")[1].style.backgroundColor='#2512b0'
                document.querySelectorAll(".answerSuAndRe")[1].style.color='white'
            },1000)
    
            let sub2=setInterval(()=>{
                document.querySelectorAll(".answerSuAndRe")[1].style.backgroundColor='yellow'
                document.querySelectorAll(".answerSuAndRe")[1].style.color='black'
                document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor='#2512b0'
                document.querySelectorAll(".answerSuAndRe")[0].style.color='white'
            },2000)
            document.addEventListener ("click",()=>{
                clearInterval(sub1);
                clearInterval(sub2);
                let one = document.querySelectorAll(".answerSuAndRe")[0].style.backgroundColor
                let two = document.querySelectorAll(".answerSuAndRe")[1].style.backgroundColor
                submit(one,two)
        })
        }
    
        if(p1Color =="yellow"){
            console.log('p1')
            let audio1 =document.querySelector('.audio1')
            audio1.play()
            if(ans1.innerHTML == ' '){
                console.log(wor1.innerHTML)
                ans1.innerHTML=wor1.innerHTML
                wor1.innerHTML=" "
            }
            else if(ans2.innerHTML ==' '){
                ans2.innerHTML=wor1.innerHTML
                wor1.innerHTML =" "
            }
            else if(wor1.innerHTML !=" "){
                ans3.innerHTML=wor1.innerHTML
                wor1.innerHTML =" "
            }
            if(ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " "){
                wor1.style.backgroundColor ='#b1e1f4'
                timeouts()
                intervel = setInterval(function () {timeouts()}, 4000);
            }else{
                clearInterval(intervel);
                wor1.style.backgroundColor ='#b1e1f4'
                onclicking()
            }
            
        }else if(p2Color =='yellow'){
            let audio1 =document.querySelector('.audio2')
            audio1.play()
            if(ans1.innerHTML ==' '){
                ans1.innerHTML=wor2.innerHTML
                wor2.innerHTML =" "
            }
            else if(ans2.innerHTML ==' '){
                ans2.innerHTML=wor2.innerHTML
                wor2.innerHTML =" "
            }
            else if(wor2.innerHTML !=" "){
                ans3.innerHTML=wor2.innerHTML
                wor2.innerHTML =" "
            }
            if(ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " "){
                wor2.style.backgroundColor ='#b1e1f4'
                timeouts()
                intervel = setInterval(function () {timeouts()}, 4000);
            }else{
                clearInterval(intervel);
                wor2.style.backgroundColor ='#b1e1f4'
                onclicking()
            }
        }else if(p3Color =='yellow'){
            let audio1 =document.querySelector('.audio3')
            audio1.play()
            if(ans1.innerHTML ==' '){
                ans1.innerHTML=wor3.innerHTML
                wor3.innerHTML =" "
            }
            else if(ans2.innerHTML ==' '){
                ans2.innerHTML=wor3.innerHTML
                wor3.innerHTML =" "
            }
            else if(wor3.innerHTML !=" "){
                console.log(wor3.innerHTML)
                ans3.innerHTML=wor3.innerHTML
                wor3.innerHTML =" "
            }
            if(ans1.innerHTML == " " || ans2.innerHTML == " " || ans3.innerHTML == " "){
                wor3.style.backgroundColor ='#b1e1f4'
                timeouts()
                intervel = setInterval(function () {timeouts()}, 4000);
            }else{
                clearInterval(intervel);
                wor3.style.backgroundColor ='#b1e1f4'
                onclicking()
            }
        }
    })

