const alreadyGuessed = document.querySelector(".guessed-letters");
// The unordered list where the player’s guessed letters will appear.
const button = document.querySelector(".guess");
// The button with the text “Guess!” in it.
const letterInput = document.querySelector(".letter");
// The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress");
// The empty paragraph where the word in progress will appear.
const remainingGuesses = document.querySelector(".remaining");
// The paragraph where the remaining guesses will display.
const span = document.querySelector(".remaining span");
// The span inside the paragraph where the remaining guesses will display.
const messageToUser = document.querySelector(".message");
// The empty paragraph where messages will appear when the player guesses a letter.
const replayButton = document.querySelector(".play-again");
// new game button

const word = "magnolia";
// starting word to test out the game
const guessedLetters = [];

const placeHolder = function (word) {
    // function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols
    const letters = [];
    for (let letter of word) {
        console.log(letter)
        letters.push("●");
    }
    wordInProgress.innerText = letters.join("");
}
placeHolder(word);


button.addEventListener("click", function(e){
    // event listener for when a player clicks the Guess button.
    e.preventDefault();
    // prevent auto clear 
    messageToUser.innerText = "";
    const inputValue = letterInput.value;
    letterInput.value = "";
    
    playerInput(inputValue);
    // console.log(inputValue)
})

// button.addEventListener("click", function(){
//     e.preventDefault();
//     // prevent auto clear 
//     messageToUser.innerText = "";
//     // use input 
//     const letter = letterInput.value;
//     // take single letter 
//     const goodGuess = playerInput(letter);

//     if(goodGuess) {
//         makeGuess(letter);
//     }
//     letterInput.value = ""
// })



// function & regex to check input value valid 
const playerInput = function(inputValue) {
    const acceptedLetter = /[a-zA-Z]/;
    // const acceptedLetter = new RegExp("/[a-zA-Z]/;")
    // Regex method
   
    if (inputValue.length === 0) {
        messageToUser.innerText = "please enter something... anything!";
    } else if (inputValue.length > 1) {
        messageToUser.innerText = "1 letter at a time!"
    } else if (!inputValue.match(acceptedLetter)) {
        messageToUser.innerText = "enter a single letter from A-Z"
    } else {
        return inputValue;
    }
}

// function to check if letter already guess & also change to upper case
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (letter == alreadyGuessed) {
        messageToUser.innerText("You already guessed this letter");
    } else {
        guessedLetters.append(letter);
    }
    console.log(guessedLetters);
}
