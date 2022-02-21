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


let reset =  document.getElementById('reset');
let guess = document.getElementById('check');
let instructions = document.getElementById('instructions');
let timer = document.getElementById('timer');

// displayScramble takes in an array of letters and for each
//   circle in the div scramble will assign the scrambled letter from
//   the letter array.
displayScramble = (letterArray) => {
    for(let i=0, len = scrambleElement.childElementCount ; i < len; ++i){
        console.log(scrambleElement.children[i]);
        scrambleElement.children[i].innerText = letterArray[i];
        }
    
}

randomWord = (dictionaryArray) => {
  let index = Math.floor(Math.random() * dictionaryArray.length + 1) - 1;  
  console.log("Random Word: ", dictionaryArray[index].word);
  return dictionaryArray[index].word
}

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

let s = scrambleWord(randomWord(dictionary));
console.log("Scramble: ", s);
displayScramble(s);

guessWord = () => {
    console.log("guessWord: ");
}
resetGame = () => {
    console.log("resetGame: ");
}

displayInstructions = () => {
    console.log("displayInstructions: ");
}

startTimer = () => {
    console.log("startTimer : ");
}

reset.addEventListener("click", resetGame);
guess.addEventListener("click", guessWord);
instructions.addEventListener("click", displayInstructions);
timer.addEventListener("click", startTimer);