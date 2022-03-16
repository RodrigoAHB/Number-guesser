/* 
    GAME FUNCTION
    - Player must guess a number between a min and a max 
    - Player gets a certain amount of guesses
    - Notify player of guesses remaining
    - Notify the player of the correct aswer if loose
    - Let player choose to play again
*/

// Game values
let min = 1
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI  min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen to Play again
UIgame.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validade
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red'); 
        console.log('wrong')
    } else if (guess === winningNum) {
        // Game Over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // Game Over - Lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`, 'red')

        } else {
            // Game Continues - answer wrong
            // Change border
            guessInput.style.borderColor = 'red';
            // Clear input
            guessInput.value = '';
            // Tell user its wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

        }
    }
})

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Game over
function gameOver (won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    
    // Disable the input
    guessInput.disabled = true;
    // Change border
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set Message
    setMessage(msg);
    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}