'use strict';
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let player0EL = document.querySelector('.player--0');
let player1EL = document.querySelector('.player--1');
const scoreEL0 = document.getElementById('score--0');
const scoreEL1 = document.getElementById('score--1');
let player0Score = document.getElementById('current--0');
let player1Score = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
diceEL.classList.add('hidden');
let scores, currentScore, playing, activePlayer;
let init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  scoreEL0.textContent = 0;
  scoreEL1.textContent = 0;
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  player0EL.classList.add(`player--active`);
  player1EL.classList.remove(`player--active`);
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  diceEL.classList.remove('hidden');
};
init();
let switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice1 = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice1}.png`;
    if (dice1 !== 1) {
      currentScore += dice1;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    playing = false;
    currentScore = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEL.classList.add('hidden');
  } else {
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
