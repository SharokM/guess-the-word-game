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
// const win = document/querySelector(".highlight");

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
    e.preventDefault();
    // prevent auto clear 
    messageToUser.innerText = "";
    // use input 
    const inputValue = letterInput.value;
    // take single letter 
    const goodGuess = playerInput(letter);

    if(goodGuess) {
        makeGuess(letter);
    }
    letterInput.value = ""
})

// TEST - EVENT LISTENER 
// button.addEventListener("click", function(e){
//     // event listener for when a player clicks the Guess button.
//     e.preventDefault();
//     // prevent auto clear 
//     messageToUser.innerText = "";
    // use input
//     const inputValue = letterInput.value;
//     letterInput.value = "";
    
//     playerInput(inputValue);
//     // console.log(inputValue)
// })

// function & regex to check input value valid 
const playerInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    // const acceptedLetter = new RegExp("/[a-zA-Z]/;")
    // Regex method
   
    if (input.length === 0) {
        messageToUser.innerText = "please enter something... anything!";
    } else if (input.length > 1) {
        messageToUser.innerText = "1 letter at a time!"
    } else if (!input.match(acceptedLetter)) {
        messageToUser.innerText = "enter a single letter from A-Z"
    } else {
        return input;
    }
}

// function to check if letter already guess & also change to upper case
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messageToUser.innerText("You already guessed this letter");
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        playerGuesses();
        updateWord(guessedLetters)
    }
};

// function to show guessed letters 
const playerGuesses = function() {
    alreadyGuessed.innerHTML = "";
    // clear list of ul
    for (const guess of guessedLetters) {
    const li = document.createElement("li");
    // create list item for each letter in guessedletter array
    li.innerText = guess;
    alreadyGuessed.append(li);
    // add new list item to ul
    }
};

// Function to Update the Word in Progress
const updateWord = function (guessedLetters) {
    // change the word variable to uppercase.
    const wordUpper = word.toUpperCase();
    // split the word string into an array
    const wordArray = word.split("");
    // create a new array with the updated characters 
    const revealWord = [];
    // Check if the wordArray contains any letters from the guessedLetters array
    for (const letter of wordArray) {
        if (guessedLetters.includes(guess)) {
            revealWord.push(letter.toUpperCase());
        } else { revealWord.push("●");
        }
    }
    console.log(revealWord);
    wonGame();
}

const wonGame = function () {
    if (wordInProgress.innerText === word.toUpperCase) {
        messageToUser.classList.add("win");
        messageToUser.innerHTML = ("highlight");
    }


// FIX GUESS VS LETTER PARAMETERS!

























