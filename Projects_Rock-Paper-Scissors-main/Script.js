let comp = '';
let result = '';
let interval;
let score = { win: 0, loss: 0, tie: 0 };

// cached DOM
const resultEl = document.querySelector('.result');
const moveEl = document.querySelector('.move');
const scoreParagraph = document.querySelector('.score'); // kept for compatibility
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');
const tiesEl = document.getElementById('ties');

update();

function compMove() {
    let random = Math.random();
    if (random < 1 / 3)
        comp = 'rock';
    else if (random >= 1 / 3 && random < 2 / 3)
        comp = 'paper';
    else
        comp = 'scissors';
    return comp;
}

function play(player) {
    const compChoice = compMove();
    if (player === 'rock') {
        if (compChoice === 'rock') {
            result = "It's a Tie";
            score.tie += 1;
        }
        else if (compChoice === 'paper') {
            result = 'You Lose';
            score.loss += 1;
        }
        else {
            result = 'You Win';
            score.win += 1;
        }
    }
    else if (player === 'paper') {
        if (compChoice === 'paper') {
            result = "It's a Tie";
            score.tie += 1;
        }
        else if (compChoice === 'scissors') {
            result = 'You Lose';
            score.loss += 1;
        }
        else {
            result = 'You Win';
            score.win += 1;
        }
    }
    else { // scissors
        if (compChoice === 'scissors') {
            result = "It's a Tie";
            score.tie += 1;
        }
        else if (compChoice === 'rock') {
            result = 'You Lose';
            score.loss += 1;
        }
        else {
            result = 'You Win';
            score.win += 1;
        }
    }

    // update UI
    resultEl.textContent = `Result :: ${result}`;
    move(player, compChoice);
    update();
}

function update() {
    // update new scoreboard table cells
    if (winsEl) winsEl.textContent = score.win;
    if (lossesEl) lossesEl.textContent = score.loss;
    if (tiesEl) tiesEl.textContent = score.tie;

    // keep old paragraph for backward compatibility
    if (scoreParagraph) {
        scoreParagraph.innerHTML = `ScoreBoard : Win : ${score.win} Loss : ${score.loss} Tie : ${score.tie}`;
    }
}

function move(you, compChoice) {
    let m = '';
    let y = '';
    if (compChoice === 'rock')
        m = '✊🏼';
    else if (compChoice === 'paper')
        m = '🖐🏼';
    else
        m = '✌🏼';

    if (you === 'rock')
        y = '✊🏼';
    else if (you === 'paper')
        y = '🖐🏼';
    else
        y = '✌🏼';

    moveEl.innerHTML = `You : ${y} - ${m} : Computer`;
}

function autoPlay() {
    const autoChoice = compMove();
    if (autoChoice === 'rock')
        play('rock');
    else if (autoChoice === 'paper')
        play('paper');
    else
        play('scissors');
}

// controls
let rock = document.querySelector('.rock');
rock.addEventListener('click', () => play('rock'));
document.addEventListener('keydown', (e) => { if (e.key === 'r') play('rock'); });

let paper = document.querySelector('.paper');
paper.addEventListener('click', () => play('paper'));
document.addEventListener('keydown', (e) => { if (e.key === 'p') play('paper'); });

let scissors = document.querySelector('.scissors');
scissors.addEventListener('click', () => play('scissors'));
document.addEventListener('keydown', (e) => { if (e.key === 's') play('scissors'); });

// reset button
let resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => {
    // stop autoplay if running
    if (interval) {
        clearInterval(interval);
        interval = undefined;
    }
    // reset UI and scores
    resultEl.innerHTML = '';
    moveEl.innerHTML = '';
    score = { win: 0, loss: 0, tie: 0 };
    update();

    // if auto button label changed, restore it
    const autoButton = document.querySelector('.auto');
    if (autoButton && autoButton.textContent.trim() !== 'Auto Play') {
        autoButton.textContent = 'Auto Play';
    }
});

// auto play toggle
let autoBtn = document.querySelector('.auto');
autoBtn.addEventListener('click', () => {
    if (autoBtn.textContent.trim() === 'Auto Play') {
        autoBtn.textContent = 'Stop Auto Play';
        interval = setInterval(() => autoPlay(), 1500);
    } else {
        autoBtn.textContent = 'Auto Play';
        clearInterval(interval);
        interval = undefined;
    }
});







