const guessedLetters = document.querySelector(".guessed-letters");
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
const message = document.querySelector(".message");
// The empty paragraph where messages will appear when the player guesses a letter.
const replayButton = document.querySelector(".play-again");

const word = "magnolia";
// your starting word to test out the game

const placeHolder = function (word) {
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
    const inputValue = letterInput.value;
    console.log(inputValue);
    letterInput.value = "";
})

