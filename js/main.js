const rule_cancel = document.querySelector(".rule-cancel")
const rule_btn = document.querySelector(".rule-btn")
const rule_alert = document.querySelector(".rule-alert")
const main_contain = document.querySelector(".main-contain")
const paper_btn = document.querySelector("#paper")
const scissor_btn = document.querySelector("#scissor")
const rock_btn = document.querySelector("#rock")
const user_img_contain = document.querySelector("#user-img-contain")
const main_choose = document.querySelector(".main-choose")
const computer_img_contain = document.querySelector("#computer-img-contain")
const play_btn = document.querySelector(".play-btn")
const result_dialog = document.querySelector(".result-dialog")
const dialog_text = document.querySelector(".dialog-text")
const score_number = document.querySelector(".score-number")

let score_value = localStorage.getItem('score_value')

score_value = score_value == null ? 0 : score_value
score_value = parseInt(score_value)
score_number.classList.add('hide')
score_number.textContent = score_value
score_number.classList.remove('hide')

rule_cancel.addEventListener('click', (e)=>{
    rule_alert.classList.add('hide')
})
rule_btn.addEventListener('click', (e)=>{
    rule_alert.classList.remove('hide')
})

paper_btn.addEventListener('click', (e)=>{
    addUserPick('paper')
})
scissor_btn.addEventListener('click', (e)=>{
    addUserPick('scissor')
})
rock_btn.addEventListener('click', (e)=>{
    addUserPick('rock')
})

play_btn.addEventListener('click', (e)=>{
    if (!main_choose.classList.contains('hide')){
        main_choose.classList.add('hide')
    }
    if (!result_dialog.classList.contains('hide')){
        result_dialog.classList.add('hide')
    }

    main_contain.classList.remove('hide')
})

function addUserPick(text) {
    user_img_contain.classList.remove('paper')
    user_img_contain.classList.remove('rock')
    user_img_contain.classList.remove('scissor')
    user_img_contain.classList.add(text)
    let texts = text == 'scissor' ? 'scissors' : text
    user_img_contain.innerHTML = `<img src="images/icon-${texts}.svg" alt="" class="user-img">`
    if (!main_contain.classList.contains("hide")){
        main_contain.classList.add('hide')
    }
    main_choose.classList.remove('hide')
    addComputerPick(text)
}

function addComputerPick(user_text) {
    const timeout = 1000

    const pick_icons = ['rock', 'paper', 'scissor']
    const randomIndex = Math.floor(Math.random() * pick_icons.length)
    let text = pick_icons[randomIndex]
    
    computer_img_contain.classList.remove('paper')
    computer_img_contain.classList.remove('rock')
    computer_img_contain.classList.remove('scissor')
    let texts = text == 'scissor' ? 'scissors' : text
    computer_img_contain.innerHTML = `<img src="images/icon-${texts}.svg" alt="" class="user-img hide" id="computer-img">`
    if (!main_contain.classList.contains("hide")){
        main_contain.classList.add('hide')
    }

    setTimeout(() => {    
        computer_img_contain.classList.add(text)
        document.querySelector('#computer-img').classList.remove('hide')
    }, timeout);

    setTimeout(() => {    
        computer_text = text
        let result = processWinner(user_text, computer_text)
        dialog_text.textContent = result[1]
        update_score_number(score_value)
        result_dialog.classList.remove('hide')
    }, 1500);
}

function processWinner(user_text, computer_text) {
    if (user_text == computer_text){
        return [false, 'WE TIE! 😰']
    }
    else if (user_text == 'scissor' && computer_text == 'rock'){
        return [false, 'YOU LOSE! 😂']
    }
    else if (user_text == 'paper' && computer_text == 'scissor'){
        return [false, 'YOU LOSE! 🤣']
    }
    else if (user_text == 'rock' && computer_text == 'paper'){
        return [false, 'YOU LOSE! 🤣']
    }

    score_value = score_value + 1
    return [true, 'YOU WIN! 🎉🏆']
}

function update_score_number(newNumber) {
    let score = localStorage.getItem('score_value')
    if (score != newNumber){
        localStorage.setItem('score_value', newNumber)
        score_number.classList.add('hide')
        score_number.textContent = newNumber
        score_number.classList.remove('hide')
    }  
}
