const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('modal');
const winnerMessageElement = document.getElementById('winnerMessage');
const closeModalButton = document.getElementById('closeModalButton');

let board;
let currentPlayer;
let isGameOver;

function init() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    isGameOver = false;
    renderBoard();
    modal.style.display = 'none';
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (isGameOver || board[index]) return;
    board[index] = currentPlayer;
    if (checkWinner()) {
        winnerMessageElement.textContent = `${currentPlayer} wins!`;
        modal.style.display = 'block';
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        winnerMessageElement.textContent = `It's a tie!`;
        modal.style.display = 'block';
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    renderBoard();
}

function checkWinner() {
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
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

restartButton.addEventListener('click', init);
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    init();
});

init();
