// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const patternLength = 8; // how long the randomly generated pattern should be

//Global Variables
var tonePlaying = false;
var volume = 0.5; // must be between 0.0 and 1.0
var pattern = [];
var progress = 0; 
var gamePlaying = false;
var guessCounter = 0;
var numMistakes = 0;
var difficulty = "normal"; // stores chosen difficulty - default is normal 
var timer; // will be used to set the interval and countdown the number of seconds remaining
// amount of time user has to guess in seconds based on their chosen difficulty 
var difficultyOptions = {
  hard: 3,
  normal: 5,
  easy: 7
}
var secondsRemaining = difficultyOptions[difficulty]; // counts the number of second player has to make a guess 
var clueHoldTime = 1000; // how long to hold each clue's light/sound - decreases as player gets further into the game

function startGame(){
  //initialize game variables
  progress = 0;
  numMistakes = 0;
  gamePlaying = true;
  createRandomPattern(); // generates the pattern for the new game 

  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  // handles how timer and its components and the difficulty selection should be displayed on game start
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("timerText").classList.add("inline");
  document.getElementById("timerDisplay").classList.add("inline");
  document.getElementById("difficultySelection").classList.add("hidden");
  difficulty = document.getElementById("difficulty").value;
  console.log(difficulty);
  resetTimerDisplay();
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  // handles how timer and its components and the difficulty selection should be displayed on game stop
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("timerText").classList.remove("inline");
  document.getElementById("timerDisplay").classList.remove("inline");
  document.getElementById("difficultySelection").classList.remove("hidden");
  clearInterval(timer);
  timer = null;
}

function lightButton(btn) {
  document.getElementById("button"+btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button"+btn).classList.remove("lit");
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  // used to start timer countdown after the sequence finishes playing 
  setTimeout(setTimer, nextClueWaitTime + (progress * clueHoldTime) + (progress * cluePauseTime)); 
  console.log((progress * clueHoldTime) + (progress * cluePauseTime));
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime; 
    delay += cluePauseTime;
  }
  // decreasing the clue hold time every time this function is called 
  clueHoldTime -= 70; // decreases by 70 each time
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  resetTimerDisplay();

  // first check if we even guessed correctly
  if (btn == pattern[guessCounter]) {
    // the entered guess was correct
    if (guessCounter == progress) {
      // the current turn is over
      if (guessCounter == (pattern.length - 1)) {
        // we are at the end of the pattern, which means we won!
        winGame();
      }
      else {
        // we are not finished with the game yet, so we play next sequence
        progress++;
        clearInterval(timer); // clear the timer and wait for next sequence of clues to be played
        playClueSequence();
      }
    }
    else {
      // we are not at the end of current turn, go to next guess 
      guessCounter++;
    }
  }
  else {
    // we didn't guess correctly, so we lose the game 
    numMistakes++;
    // check if the user has made 3 mistakes 
    if (numMistakes == 3) {
        loseGame();
    }
  }
}

// Generates a random integer between 1 and 6 that represents a button number
function genRandomInteger() {
    let max = 6; // total number of game buttons that represents the upper bound 
    let min = 1; // lower bound
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generates random pattern for each new game playthrough by appending to pattern
function createRandomPattern() {
    pattern = []; // create a new pattern

    // generate random sequence up to defined pattern length
    for (let i = 0; i < patternLength; i++) {
        pattern.push(genRandomInteger());
    }
}

// manages taking away 1 second away from the timer
function oneSecondCountdown() {
    secondsRemaining--;
    document.getElementById("timerDisplay").innerHTML = secondsRemaining;
}

// sets up timer
function setTimer() {
    // create a timer only if the game is currently being played 
    if (gamePlaying) {
        timer = setInterval(timerManager, 1000);
    }
}

// handles timer game functionality 
function timerManager() {
    // check if there are no seconds remaining on the timer 
    if (secondsRemaining == 0) {
        numMistakes++;
        // if the user has made 3 mistakes either because of incorrect guesses or the timer
        if (numMistakes == 3) {
            loseGame();
        }
        else {
            resetTimerDisplay();
        }
    } else {
        oneSecondCountdown();
    }
}

// reset the timer display
function resetTimerDisplay() {
    secondsRemaining = difficultyOptions[difficulty];
    document.getElementById("timerDisplay").innerHTML = secondsRemaining;
}

// Sound Synthesis Functions
const freqMap = {
  1: 255.5,
  2: 325.5,
  3: 399,
  4: 470.7,
  5: 500.6,
  6: 553.1
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
