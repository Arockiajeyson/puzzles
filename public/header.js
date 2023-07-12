let headerIm = document.querySelector('.headerViewpage')
let imgs = document.createElement('img')
imgs.src = "/asset/kavi2-removebg-preview.png"
imgs.className = 'kaviplus'
let divs = document.createElement('div')
divs.className = 'lineDiv'
let spans1 = document.createElement('span')
spans1.className = 'aboutEnability'
spans1.innerHTML = 'About'
let spans2 = document.createElement('span')
spans2.className = 'enabilityLogo '
let hyper = document.createElement('a')
hyper.href = 'https://enability.in'
hyper.target = '_blank'
hyper.className = 'enability_a'
let enabilityL = document.createElement('img')
enabilityL.src = "https://enability.in/assets/images/enability_logo.png"
enabilityL.className = 'imgenability'
hyper.appendChild(enabilityL)
spans2.appendChild(hyper)
headerIm.append(imgs, divs, spans1, spans2)

let leftImg = document.querySelector('.img-left-side ')
let imgsLeft =document.createElement('img')
imgsLeft.src ='/asset/book-removebg-preview.png'
imgsLeft.style.marginTop ='-.1em'  
imgsLeft.className='img-class '
leftImg.appendChild(imgsLeft)

let adimLogTag =document.querySelector('.adminpageimg')
let head1 =document.createElement('h2')
head1.style.color='white'
head1.innerHTML ='WELCOME TO STUDENT PAGE'
let img2 =document.createElement('img')
img2.src='/asset/thinking-1.png'
img2.className='img-style-rigth'
let imgthree =document.createElement('img')
imgthree.src='/asset/i am possible.png'
imgthree.className='impossible'
adimLogTag.append(head1, img2, imgthree)