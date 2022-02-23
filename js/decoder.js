// Decoder is a game developed using HTML, Javascript and CSS.

// A player's task is to guess a word where the letters are scrambled.
// At each step of the guess process the player is told whether a letter is
// in a correct position or not.

// A player may setup a Timer to guess the word within 1 minute.

// # Game Rules

// Unscramble the letters to find the word by selecting a letter to play
// and checking it against the actual word.  For each guess you are decoding
// the word by being told if the letter is in the correct position or not.
// Green indicate the right position.

// # Instructions
// - Choose to have a Timer set or not.
// - Unscramble the letters by selecting the letter for each position based off
// of feedback provided for each letter.
// - Guess within the Time period or in 10 guesses.
// - The game tracks wins and losses

// Nope doesn't work.  Reading in a file is not going to happen.  Browser
//  won't allow it.
// import wordData from '../5-letter-words-shorter.json';

// Setup being able to use JSON data from any source or potential file
// Setup the dictionary as an array containing words.
const dictionaryData = [{"word":"aahed"},{"word":"aalii"},{"word":"aargh"},{"word":"abaca"},{"word":"abaci"},{"word":"aback"},{"word":"abaft"},{"word":"abaka"},{"word":"abamp"},{"word":"abase"},{"word":"abash"},{"word":"abate"},{"word":"abaya"},{"word":"abbas"},{"word":"abbes"},{"word":"abbey"},{"word":"abbot"},{"word":"abeam"},{"word":"abele"},{"word":"abets"},{"word":"abhor"},{"word":"abide"},{"word":"abled"},{"word":"abler"},{"word":"ables"},{"word":"abmho"},{"word":"abode"},{"word":"abohm"},{"word":"zings"},{"word":"zingy"},{"word":"zinky"},{"word":"zippo"},{"word":"zippy"},{"word":"ziram"},{"word":"zitis"},{"word":"zizit"},{"word":"zlote"},{"word":"zloty"},{"word":"zoeae"},{"word":"zoeal"},{"word":"zoeas"},{"word":"zombi"},{"word":"zonae"},{"word":"zonal"},{"word":"zoned"},{"word":"zoner"},{"word":"zones"},{"word":"zonks"},{"word":"zooey"},{"word":"zooid"},{"word":"zooks"},{"word":"zooms"},{"word":"zoons"},{"word":"zooty"},{"word":"zoril"},{"word":"zoris"},{"word":"zouks"},{"word":"zowee"},{"word":"zowie"},{"word":"zuppa"},{"word":"zuzim"},{"word":"zymes"}];
const dictionary = JSON.parse(JSON.stringify(dictionaryData));
console.log(dictionary[0].word)

let scrambleElement = document.getElementById('scramble');
console.log(scrambleElement);

let rounds = 1;
let guess = 1;
let wins = 0;
let lose = 0;
let solution = "";
let alarm = "";
let enableTimerButton = true;

let resetButton =  document.getElementById('reset');
let guessButton = document.getElementById('check');
let instructionsButton = document.getElementById('instructions');
let timerButton = document.getElementById('timer');
let answerDisplay = document.getElementById('answer_display');
let clockDisplay = document.getElementById('clock_display');
let winnerDisplay = document.getElementById('winner_display');
let loserDisplay = document.getElementById('loser_display');

resetTimer = () => {
    console.log("resetTimer:");
    clockDisplay.innerText = " ";
    clockDisplay.style.color = "black";

    // if the timer has been disabled then enable the button event
    //   listener.
    if (!enableTimerButton) {
        timerButton.addEventListener("click", startTimer);
    }
}

resetGameLoss = () => {
    console.log("resetGameLoss:");
    loserDisplay.innerHTML = " ";
}

resetGameWins = () => {
    console.log("resetGameWins:");
    winnerDisplay.innerHTML = " ";

}

resetGameStatus = () => {
    console.log("resetGameStatus");
    answerDisplay.innerHTML = " ";
}

resetGuesses = () => {
    // Retrieve all the guess elements
    //   This will match on the starting guess in the id
    let allGuesses = document.querySelectorAll('[id^="guess"]');
    console.log("All Guesses:", allGuesses);

    // // Go thru the children of the guess elements and reset to empty.
    for(let i=0, len = allGuesses.length ; i < len; ++i){
        // Loop through all the children of a Guess for the circles
        for (let j = 0, clen = allGuesses[i].children.length; j < clen; j++) {
          allGuesses[i].children[j].innerText = " ";
          allGuesses[i].children[j].style.backgroundColor = 'white';
        }
    }
}

resetDisplayScramble = () => {
    for(let i=0, len = scrambleElement.childElementCount ; i < len; ++i){
        console.log(scrambleElement.children[i]);
        scrambleElement.children[i].innerText = " ";
    }
}

setNewWord = () => {
    originalWord = randomWord(dictionary);
    originalWordArray = originalWord.toUpperCase().split("");
    solution = originalWordArray.toString();
    console.log("ORIGINAL WORD ARRAY: ", originalWordArray);
    
    let s = scrambleWord(originalWord);
    console.log("Scramble: ", s);
    displayScramble(s);
}

// Clears an Alarm and Time period that is currently activated.
resetAlarm = () => {
    if (alarm !== "") {
        clearTimeout(alarm);
        alarm = "";
    }
}

// resetNewGame will initialize all the variables for the gameboard
//   It will also remove any text created from prior running the game.
//   It will also redisplay a new scrambled word.
resetGame = () => {

    console.log("resetGame");

    // wins = 0;
    // lose = 0;
    guess = 1;
    solution = "";

    // Need to remove all the letters in the displays.

    // resetGameLoss();
    // resetGameWins();

    resetGameStatus();
    resetGuesses();

    // Resets the Alarm and Timer Display
    resetAlarm();
    resetTimer();

    resetDisplayScramble();

    setNewWord();
}


// updateGameLoss will update the loss of the game once you have guessed
//   5 times and there is no match.  It will display the LOSE message in
//   the loss display area.
updateGameLoss = () => {
    if (guess === 5) {
       lose++; 
       resetAlarm();
       loserDisplay.style.color = 'white';
       loserDisplay.innerHTML = `<span style="color: red">LOSE:</span> ${lose}`;
    }
}

// updateGameWins will update the wins of the game and also display the wins
//   message in the win display area.
updateGameWins = () => {
    wins++;
    resetAlarm();
    winnerDisplay.style.color = 'white';
    winnerDisplay.innerHTML = `<span style="color: red">WINS:</span> ${wins}`;
}

// updateGameStatus will update the answer display depending on whether
//   the a player has won or not.
updateGameStatus = (winner) => {

    answerDisplay.style.color = 'white';
    console.log("updateGameStatus: ");
    if (winner) {
        // answerDisplay.innerText = `${originalWord.toUpperCase()}`;
        answerDisplay.innerHTML = `<span style="color: red">YOU WON!</span>  ${originalWord.toUpperCase()}`;

        updateGameWins();
    } else {
        if (guess !== 5) {
            answerDisplay.innerText = 'Guess Again';
        } else {
            answerDisplay.innerText = 'You LOSE!';
        }
        updateGameLoss();
    }
}

// pickLetter will get the button letter information and then find 
//  the correct empty guess row circle to place the letter in.
pickLetter = (event) => {
    console.log("pickLetter");
    let letter = event.target.innerText;
    console.log("pickLetter: letter:", letter);
    let firstGuess = document.getElementById(`guess${guess}`);
    for(let i=0, len = firstGuess.childElementCount ; i < len; ++i){
        if (firstGuess.children[i].innerText === "") {
            console.log(firstGuess.children[i]);
            firstGuess.children[i].innerText = letter;
            break;
        }
    }
}

// enableScrambleButtons will add click events to the children of
//   the div scramble output.
enableScramble = () => {
    for(let i=0, len = scrambleElement.childElementCount ; i < len; ++i){
        scrambleElement.children[i].addEventListener('click', pickLetter);
    }
}

// displayScramble takes in an array of letters and for each
//   circle in the div scramble will assign the scrambled letter from
//   the letter array.
displayScramble = (letterArray) => {
    for(let i=0, len = scrambleElement.childElementCount ; i < len; ++i){
        console.log(scrambleElement.children[i]);
        scrambleElement.children[i].innerText = letterArray[i];
    }
    
}

// randomWord takes an array of dictionary words and returns one string
//   word.
randomWord = (dictionaryArray) => {
  let index = Math.floor(Math.random() * dictionaryArray.length + 1) - 1;  
  console.log("Random Word: ", dictionaryArray[index].word);
  return dictionaryArray[index].word
}

// scrambleWord takes a string word and creates an array in order to
//   randomly shuffle the characters in the word.
//   It returns an array.
scrambleWord = (word) => {
    // Take the word and create an array with letters
    let letters=word.toUpperCase().split("");
    console.log(letters);
    
    let currentIndex = letters.length,  randomIndex;

    // While there are elements to shuffle
    while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [letters[currentIndex], letters[randomIndex]] = [
      letters[randomIndex], letters[currentIndex]];
  }

  holdWord = letters.join(" ");
  return (letters);
}

let originalWord = randomWord(dictionary);
let originalWordArray = originalWord.toUpperCase().split("");
solution = originalWordArray.toString();
console.log("ORIGINAL WORD ARRAY: ", originalWordArray);

let s = scrambleWord(originalWord);
console.log("Scramble: ", s);
displayScramble(s);

guessWord = () => {
    console.log("guessWord: ");

    let guessRowArray = [];

    // Compare the word from the guess to the original word letter by
    //  letter and change the circle to green if the letter is correct.

    let guessRow = document.getElementById(`guess${guess}`);
    console.log("guessWord: guessRow: ",guessRow);
    // let guessChildren = guessRow.childNodes;
    // console.log(guessChildren);
    
    // Go thru the divs to create an array to check for a string match.
    // While doing this also update which letters are in the correct position
    //   and set the color for the circle.
    for (let i=0, len = guessRow.childElementCount ; i < len; ++i){
        guessRowArray.push(guessRow.children[i].innerText);

        console.log("Comparing: ", guessRow.children[i].innerText);
        console.log("    to: ", originalWordArray[i]);
        if (guessRow.children[i].innerText ===
            originalWordArray[i]) {
            guessRow.children[i].style.backgroundColor = 'green';
        }

    }

    console.log("Row Array: ", guessRowArray);
    // let newWord = guessRowArray.join("");
    // console.log("New Word to Check: ", newWord);
    // console.log("Original word array ", );

    // Check to see if you have a Match.
    if (guessRowArray.toString() === solution) {
        console.log("You MATCHED!");

        updateGameStatus(true);

    } else {
        console.log("NOT A MATCH");
        // Need to see which letters are in the correct position

        updateGameStatus(false);
    }

    // Update to the next guess
    guess++;
}

displayInstructions = () => {
    console.log("displayInstructions: ");
}

startTimer = () => {
    console.log("startTimer : ");

    // Disable the Timer button from being called again.
    timerButton.removeEventListener("click", startTimer);
    enableTimerButton = false;


    // Setup the 1 minute Timer and display the countdown.  Update
    //  the display every 1 second.
    let seconds = 60;
    tick = () => {
        seconds--;
        clockDisplay.innerText = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        clockDisplay.style.color = "yellow";
        if( seconds > 0 ) {
            alarm = setTimeout(tick, 1000);
        } else {
            answerDisplay.innerText = 'Timed out: You LOSE!';
            // You lose so set to end of your guesses to reinitialize.
            guess = 5;
            updateGameLoss();
        }
    }

    tick();
}

enableScramble();
resetButton.addEventListener("click", resetGame);
guessButton.addEventListener("click", guessWord);
instructionsButton.addEventListener("click", displayInstructions);
if (enableTimerButton) {
    timerButton.addEventListener("click", startTimer);
}