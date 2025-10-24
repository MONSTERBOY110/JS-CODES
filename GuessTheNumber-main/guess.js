'use strict';
const numberInput = document.querySelector('.number');
const checkBtn = document.querySelector('.btnCheck');
const messageEl = document.querySelector('.message');
const midEl = document.querySelector('.mid');
const againBtn = document.querySelector('.btn');
const scoreEl = document.getElementById('score');
const highscoreEl = document.getElementById('highscore');
const difficultySelect = document.getElementById('difficulty');
const rangeInfo = document.getElementById('rangeInfo');

let maxNumber = Number(difficultySelect.value) || 20;
let secretNumber;
let score;
let highscore = 0;

function setMessage(msg){ messageEl.textContent = msg; }
function generateSecret(max){
  return Math.trunc(Math.random() * max) + 1;
}
function updateRangeInfo(){
  rangeInfo.textContent = `(Between 1 and ${maxNumber})`;
}
function initGame(max = 20){
  maxNumber = max;
  secretNumber = generateSecret(maxNumber);
  score = 20;
  scoreEl.textContent = score;
  midEl.textContent = '?';
  midEl.style.width = '';
  document.body.style.backgroundColor = '';
  numberInput.value = '';
  setMessage('Start Guessing....');
  updateRangeInfo();
}
function win(){
  setMessage('🎉 Correct Number!');
  midEl.textContent = secretNumber;
  document.body.style.backgroundColor = '#063b64'; // subtle win tint for blue theme
  if (score > highscore){
    highscore = score;
    highscoreEl.textContent = highscore;
  }
}

checkBtn.addEventListener('click', () => {
  const guess = Number(numberInput.value);
  if (!guess || guess < 1 || guess > maxNumber){
    setMessage(`Enter a number 1–${maxNumber}`);
    return;
  }
  if (guess === secretNumber){
    win();
    return;
  }
  if (score > 1){
    setMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
    scoreEl.textContent = score;
  } else {
    setMessage('💥 You lost the game!');
    score = 0;
    scoreEl.textContent = score;
    midEl.textContent = secretNumber;
  }
});

// Reset game
againBtn.addEventListener('click', () => initGame(maxNumber));

// Difficulty change
difficultySelect.addEventListener('change', (e) => {
  const newMax = Number(e.target.value) || 20;
  initGame(newMax);
});

// support pressing Enter in input
numberInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkBtn.click();
});

// initialize
initGame(maxNumber);
