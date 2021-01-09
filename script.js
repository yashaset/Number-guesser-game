let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;
//UI elements
const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num')
guessBtn = document.querySelector('#guess-btn')
guessInput = document.querySelector('#guess-input')
message = document.querySelector('.message')

minNum.textContent = min
maxNum.textContent = max
//play again event listener
gameWrapper.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})
//listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    //validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red ')
    }


    if (guess === winningNum) {
        //win
        gameOver(true, `${winningNum} is correct, You Win!`)
    }
    else {
        //wrong number
        guessesLeft -= 1;   //gl=gl-1
        if (guessesLeft === 0) {
            //game over, lost

            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)

        } else {
            //game continues, answer wrong
            guessInput.style.borderColor = 'orange'
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left!`, 'orange')
        }

    }
})

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = 'green'
    message.style.color = color;
    setMessage(msg, color)


    //play again?
    guessBtn.value = 'Play again'
    guessBtn.className += 'play-again'


}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg;
}
