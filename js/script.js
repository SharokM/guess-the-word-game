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

let word = "magnolia";
// starting word to test out the game
let guessedLetters = [];
// guessed letters array 
let guessesLeftRemaining = 8;
// remaining guesses 

// Random word pull 
const getWord = async function () {
    const res = await fetch("https://lotrapi.co/api/v1/characters/");
    const data = await res.text();
    const wordArray = data.split("\n") 
    // change word to words 
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim();
    console.log(data)
    // selectRandomWord(data);
    placeHolder(word);
}
// Start 
getWord();

// function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter)
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

// placeHolder(word);
// getWord();

// event listener to update input box 
button.addEventListener("click", function(e){
    e.preventDefault();
    // prevent auto clear 
    messageToUser.innerText = "";
    // // user input 
    const guess = letterInput.value;
    // // take single letter 
    console.log(guess)
    const goodGuess = playerInput(guess);

    if(goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
    playerInput(guess);
});
// input function 
   // event listener to update input box 
// button.addEventListener("click", function(e){
//     e.preventDefault();
//     // prevent auto clear 
//     messageToUser.innerText = "";
    
//     const inputValue = letterInput.value;
    
//     const goodGuess = playerInput(letter);

//     if (goodGuess) {
       
//         makeGuess(guess);
//     }
//     letterInput.value = "";
// })

// function & regex to check input value valid 
const playerInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    // const acceptedLetter = new RegExp("/[a-zA-Z]/;")
//     // Regex 
   
    if (input.length === 0) {
        messageToUser.innerText = "Please enter something... anything!";
    } else if (input.length > 1) {
        messageToUser.innerText = "1 letter at a time!"
    } else if (!input.match(acceptedLetter)) {
        messageToUser.innerText = " Enter a single letter from A-Z"
    } else {
    //   we got an accepted letter 
      return input;
    }
}

// // function to check if letter already guess & also change to upper case
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        messageToUser.innerText = "You tried that already!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessesRemaining(guess);
        playerGuesses();
        updateWordInProgress(guessedLetters);
    }
};

// // function to show guessed letters 
const playerGuesses = function() {
    // clear list of ul
    alreadyGuessed.innerHTML = "";
    for (const letter of guessedLetters) {
    // create list item for each letter in guessedletter array
        const li = document.createElement("li");
        li.innerText = letter;
    // add new list item to ul
        alreadyGuessed.append(li);
    }
};

// // Function to Update the Word in Progress
const updateWordInProgress = function (guessedLetters) {
//     // change the word variable to uppercase.
    const wordUpper = word.toUpperCase();
//     // split the word string into an array
    const wordArray = wordUpper.split("");
//     // create a new array with the updated characters 
    const revealWord = [];
//     // Check if the wordArray contains any letters from the guessedLetters array
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {revealWord.push("●");
        }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    wonGame();
};

// // function to count and monitor the player’s remaining guesses
const guessesRemaining = function (guess) {
        const wordUpper = word.toUpperCase();
        if (wordUpper.includes(guess)) {
            messageToUser.innerText = "Letter IN the word, yay!";
        } else {
            messageToUser.innerText = "Letter NOT in word! Boo!";
            guessesLeftRemaining -= 1; 
        }

        if (guessesLeftRemaining === 0) {
            messageToUser.innerText = `GAME OVER! The correct word was ${word}.`
            startOver();
        } else if (guessesLeftRemaining === 1) {
            span.innerText = "1 guess remaining!"
        } else {
            span.innerText = `You have ${guessesLeftRemaining} remaining.`
        }
}

// // check if player won 
const wonGame = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageToUser.classList.add("win");
        messageToUser.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    button.classList.add("hide"); 
    alreadyGuessed.classList.add("hide");
    remainingGuesses.classList.add("hide");
    replayButton.classList.remove("hide");
}

replayButton.addEventListener("click", function() {
    messageToUser.classList.remove("win");
    guessedLetters = []; 
    guessesLeftRemaining = 8; 
    span.innerText = `${guessesLeftRemaining} remaining`;
    alreadyGuessed.innerHTML = ""; 
    messageToUser.innerText = ""; 
    getWord();
    button.classList.remove("hide"); 
    replayButton.classList.add("hide"); 
    remainingGuesses.classList.remove("hide"); 
    alreadyGuessed.classList.remove("hide");
})


