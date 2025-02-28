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

let word = randomWord;
// starting word to test out the game
const guessedLetters = [];
// guessed letters array 

// Random word pull 
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    // console.log(data)
    selectRandomWord(data);
    
}
// getWord();
placeHolder(word);

const wordArray = words.split("\n")
console.log(wordArray);

const selectRandomWord = function (data) {
const randomIndex = Math.floor(Math.random() * data.length)
const randomWord = data[randomIndex.trim()];
// displayWord(randomWord);
placeHolder(randomWord)
};

// function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols
const placeHolder = function (word) {
    const letters = [];
    for (let letter of word) {
        console.log(letter)
        letters.push("●");
    }
    wordInProgress.innerText = letters.join("");
}
// placeHolder(word);
getWord();

// event listener to update input box 
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
    // Regex method
   
    if (input.length === 0) {
        messageToUser.innerText = "Please enter something... anything!";
    } else if (input.length >= 2) {
        messageToUser.innerText = "1 letter at a time!"
    } else if (!input.match(acceptedLetter)) {
        messageToUser.innerText = " Enter a single letter from A-Z"
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
        guessesRemaining(guess)
        updateWord(guessedLetters)
    }
};

// function to show guessed letters 
const playerGuesses = function() {
    // clear list of ul
    alreadyGuessed.innerHTML = "";
    for (const guess of guessedLetters) {
    // create list item for each letter in guessedletter array
    const li = document.createElement("li");
    li.innerText = guess;
    // add new list item to ul
    alreadyGuessed.append(li);
    }
};

// Function to Update the Word in Progress
const updateWord = function (guessedLetters) {
    // change the word variable to uppercase.
    const wordUpper = word.toUpperCase();
    // split the word string into an array
    const wordArray = wordUpper.split("");
    // create a new array with the updated characters 
    const revealWord = [];
    // Check if the wordArray contains any letters from the guessedLetters array
    for (const guess of wordArray) {
        if (guessedLetters.includes(guess)) {
            revealWord.push(guess.toUpperCase());
        } else { revealWord.push("●");
        }
    }
    console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    wonGame();
}

// function to count and monitor the player’s remaining guesses
const guessesRemaining = function (letter) {
        word.toUpperCase();
        if (word.includes(letter)) {
            messageToUser.innerText = "Letter in the word, well done!"
        } else {
            // remainingGuesses.math - 1 from remaining guesses 
            messageToUser.innerText = "Letter not included!"
        }
        if (remainingGuesses === 0) {
            return `GAME OVER! The correct word was ${word}.`
        } else if (remainingGuesses === 1) {
            span.innerText = "1 guess remaining!"
        } else {
            span.innerText = `You have ${remainingGuesses} left..`
        }
}

// check if player won 
const wonGame = function () {
    if (wordInProgress.innerText === word.toUpperCase) {
        messageToUser.classList.add("win");
        messageToUser.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

let guessesLeft = 8;



// async function to upgrade your game from displaying one word to fetching a random word




// TO DO: 
// FIX GUESS VS LETTER PARAMETERS!
// DEBUG FUNCTION TO TEST CORRECT INPUT/ NUMBER/ CHARACTER INPUT