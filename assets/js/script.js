document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons){
        button.addEventListener('click', function(){
            if (this.getAttribute('data-type') === 'submit'){
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType)
            }
        })
    }

    runGame('addition');
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){

    // Creates two random number between 1 amd 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === 'addition') {
        displayAddtionQuestion(num1, num2);
    } 
    else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    }
    else if (gameType === 'multiply'){
        displayMultiplyQuestion(num1, num2);
    } 
    else if (gameType === 'division') {
        displayDivideQuestion(num1, num2);
    } else {
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer(){

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert('Hey! You got it right! :D');
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1])
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText)
    let operand2 = parseInt(document.getElementById('operand2').innerText)
    let operator = document.getElementById('operator').innerText;

    if (operator === '+'){
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-'){
        return [operand1 - operand2, 'subtract']
    } else if (operator === 'x'){
        return [operand1 * operand2, 'multiply'];
    } else if (operator === '/'){
        return [operand1 * operand2, 'divide'];
    } else {
        alert(`Unimplemented operator ${opeator}`);
        throw `Unimplemented operator ${operator}`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore(){

    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer(){

    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAddtionQuestion(operand1, operand2){
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2){
   
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2){
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivideQuestion(operand1, operand2){
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}