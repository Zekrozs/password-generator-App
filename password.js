'use strict'
const finalPassword = document.querySelector('.password')
const checkBoxes = document.querySelectorAll('.check-box')
const generateBtn = document.querySelector('.generate-btn')
const track = document.querySelector('.track')



async function copy(){

    if (finalPassword.value ==  ''){
        document.querySelector('.generic').textContent = 'NO TEXT' 
        setTimeout(() => {
  document.querySelector('.generic').textContent = ''  
}, 3000); return;
        } 

document.querySelector('.generic').textContent = 'COPIED'
 setTimeout(() => {
  document.querySelector('.generic').textContent = ''  
}, 3000)       
    
    try{
await navigator.clipboard.writeText(finalPassword.value)
    }

    catch{
        alert('failed to copy. please refresh the page')
    }


}


 let parameters = { 
        

            uppercase: 'QWERTYUIOPASDFGHJKLZXCVBNM',
            lowercase: 'qwertyuiopasdfghjklzxcvbnm',
        
            numbers: '1234567890',
            symbols: '`¬!"£$%^&*()_+}{][~#@:;/?.>,<+-*'
        
    }


function generateChars(){
    
        let charsArr = []
    checkBoxes.forEach((box,index) => {
        if(box.checked){
        charsArr.push(parameters[box.id])
        }
    })
let charsStr = charsArr.join('')

return charsStr
    
}


function secureShuffle(passwordString){
    // turn my password into an array
    let arr = passwordString.split('')  

    let buffer = new Uint32Array(1)
    // fucking shuffule the hell out of each array item starting from the last index
        for(let i = arr.length -1; i >0; i--){
            window.crypto.getRandomValues(buffer)
           let j = buffer[0] % (i + 1);

          [arr[i], arr[j]] = [arr[j], arr[i]]

        }
        // return my cocktailed password to use in my final value all because strings are fucking immutable
        return arr.join('')
    }


function generatePassword(){
let chars = generateChars()
const length = parseInt(track.value, 10)
let password = ''
let secureBuffer = new Uint32Array(2)
let checkedCount = document.querySelectorAll('.check-box:checked').length

for (let i = 0; i < length - checkedCount; i++){
window.crypto.getRandomValues(secureBuffer)
let randomINdex = chars.at(secureBuffer[0] % chars.length)

password +=randomINdex

}

checkBoxes.forEach(box=>{
    if (box.checked){
        window.crypto.getRandomValues(secureBuffer)
        password += parameters[box.id][secureBuffer[1] % parameters[box.id].length]
    }
})

finalPassword.value = secureShuffle(password)

}

function validationRules(target){
let checkedCount = document.querySelectorAll('.check-box:checked').length

if (checkedCount === 0){
    target.checked = true
    document.querySelector('.error').textContent = 'at least one box must be selected'

    setTimeout(() =>{
          document.querySelector('.error').textContent = ''
    }, 3000)
}



}



function updateSM(){
  let score = document.querySelectorAll('.check-box:checked').length
  const meter = document.querySelectorAll('.bar')

  if (score > 1 && track.value < 15){
    score = 2
  }

  if (score <= 4 && track.value <= 8){
    score = 1
  }

  if ( score > 1 && track.value > 20){
    score = 4
  }

  

  const strengthLevels = {
      1: ['too-weak', 'TOO WEAK!'],
      2: ['weak', 'WEAK'],
      3: ['medium', 'MEDIUM'],
      4: ['strong', 'STRONG']
  }

const [currentLevel, currentText] = strengthLevels[score] || ['','']


meter.forEach((bar,index) =>{
bar.classList.remove('too-weak', 'weak', 'medium', 'strong')

if (index < score ){
 bar.classList.add(currentLevel)
   } 
}

)

  document.querySelector('.level').textContent =  currentText


}

// listeners
document.querySelector('.length-parameters').addEventListener('submit', e =>{
    e.preventDefault()

})

let wholePage = document.querySelector('.pw-generator')

wholePage.addEventListener('click', e =>{
    let target = e.target
    
    
    let generate = target.dataset.generate
    if (generate){
    document.querySelector('.generic').textContent = ''

 generatePassword()
 updateSM() 
    }


 

if (target.classList.contains('check-box')){
   validationRules(target) 
}

   
let copied = target.dataset.copy

    if(copied){
     copy()
    }
    
})

track.addEventListener('input', e =>{
document.querySelector('.digits').textContent = parseInt(track.value, 10)

const min = track.min || 0
const max = track.max || 100
const percentage = (track.value - min) / (max - min) *100 


// custom property for use in CSS to dynamically set the length of each gradient in the track
track.style.setProperty('--slider-progress', `${percentage}%`)

})

// run the input event once as soon as the page loads 
track.dispatchEvent(new Event('input'))




