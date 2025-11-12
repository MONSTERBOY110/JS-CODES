const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
const statusEl = document.getElementById('status');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

updateStatus();

function updateStatus(){
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningCombination(player) {
    for (const combination of winningCombinations) {
        if (combination.every(index => cells[index].textContent === player)) {
            return combination;
        }
    }
    return null;
}

function handleClick(event) {
    const cell = event.target;
    if (!cell.classList.contains('cell')) return;

    const index = Number(cell.getAttribute('data-index'));

    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.setAttribute('data-value', currentPlayer);

        const winningCombo = getWinningCombination(currentPlayer);
        if (winningCombo) {
            // highlight winning cells
            winningCombo.forEach(i => cells[i].classList.add('win'));
            // draw animated line over winning cells
            drawWinLine(winningCombo);
            statusEl.textContent = `Player ${currentPlayer} wins!`;
            // keep board for a moment, then reset
            setTimeout(resetBoard, 1500);
            return;
        }

        if (isDraw()) {
            statusEl.textContent = "It's a draw!";
            setTimeout(resetBoard, 1500);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function checkWin(player) {
    return !!getWinningCombination(player);
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function removeWinLine() {
    const existing = board.querySelectorAll('.win-line');
    existing.forEach(el => el.remove());
    cells.forEach(c => c.classList.remove('win'));
}

function resetBoard() {
    removeWinLine();
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-value');
    });
    currentPlayer = 'X';
    updateStatus();
}

function drawWinLine(combo) {
    // remove any previous line
    removeWinLine();

    // use first and last cells in combination to compute line
    const first = cells[combo[0]];
    const last = cells[combo[combo.length - 1]];
    const boardRect = board.getBoundingClientRect();
    const r1 = first.getBoundingClientRect();
    const r2 = last.getBoundingClientRect();

    const x1 = r1.left + r1.width / 2 - boardRect.left;
    const y1 = r1.top + r1.height / 2 - boardRect.top;
    const x2 = r2.left + r2.width / 2 - boardRect.left;
    const y2 = r2.top + r2.height / 2 - boardRect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const line = document.createElement('div');
    line.className = 'win-line';
    // position at midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    line.style.left = `${midX}px`;
    line.style.top = `${midY}px`;
    line.style.width = `${distance}px`;
    line.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(0)`;
    line.style.transformOrigin = 'left center';

    board.appendChild(line);

    // trigger animation
    requestAnimationFrame(() => {
        line.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(1)`;
    });
}

board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetBoard);