var board = ['','','','','','','','',''];
var player1 = 'X';
var player2 = 'O';
var turn = 'player1';
var nextTurn = 'player1';
var isBoardFull = false;
const winnerMessage = document.querySelector('#winner');
const resetButton = document.querySelector('#reset');

const playArea = document.querySelector('.playarea');

//CHECK FULL
const checkBoardFull = () => {
    let flag = true;
    board.forEach((cell) => {
        if(cell != player1 && cell != player2){
            flag = false;
        }
    })
    isBoardFull = flag;
}

//RENDER BOARD
const renderBoard = () => {
    playArea.innerHTML = "";
    board.forEach((player, i) => {
        playArea.innerHTML += `<div id="block_${i}" class="block" onclick="addMove(${i})">${board[i]}</div>`;
        if (player == player1 || player == player2) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
        if(player == 'X')document.querySelector(`#block_${i}`).classList.add("cross");
        if(player == 'O')document.querySelector(`#block_${i}`).classList.add("circle");
    })
    if(turn == 'player1') {
        winnerMessage.classList.remove('circle');
        winnerMessage.classList.add('cross');
        winnerMessage.innerText = 'Player 1\'s turn!';
    }
    if(turn == 'player2') {
        winnerMessage.classList.remove('cross');
        winnerMessage.classList.add('circle');
        winnerMessage.innerText = 'Player 2\'s turn!';
    }
    checkBoardFull();
}

renderBoard();

//ADD MOVE
const addMove = (num) => {
    if(board[num] == ''){
        if(turn == 'player1'){
            board[num] = player1;
            turn = 'player2';
        } else if(turn == 'player2'){
            board[num] = player2;
            turn = 'player1';
        }
        renderBoard();
        checkWin();
    }
}

//CHECK LINE
const checkLine = (a, b, c) => board[a] === board[b] && board[b] === board[c] && (board[a] === player1 || board[a] === player2)

//WINNER LINES ADD COLOR

const addGreenColor = (a, b, c) => {
    document.querySelector(`#block_${a}`).classList.add('green');
    document.querySelector(`#block_${b}`).classList.add('green');
    document.querySelector(`#block_${c}`).classList.add('green');
}

//CHECK MATCH
const checkMatch = () => {
    for(let i = 0; i < 9; i += 3){
        if(checkLine(i, i+1, i+2)) {
            addGreenColor(i, i+1, i+2);
            return board[i];
        }
    }
    for(let i = 0; i < 3; i++){
        if(checkLine(i, i + 3, i+6)){
            addGreenColor(i, i + 3, i+6);
            return board[i];
        } 
    }
    if(checkLine(0, 4, 8)) {
        addGreenColor(0, 4, 8);
        return board[0];
    }
    if(checkLine(2, 4, 6)) {
        addGreenColor(2, 4, 6);
        return board[2];
    }
    return ""
}

//CHECK WIN
const checkWin = () => {
    let result = checkMatch();
    if(!isBoardFull && result == '') return;
    if(result == player1){
        winnerMessage.innerText = 'Player 1 Wins!';
        winnerMessage.classList.add('playerWin');
    } else if(result == player2){
        winnerMessage.innerText = 'Player 2 Wins!';
        winnerMessage.classList.add('playerWin');
    }else if(isBoardFull){
        winnerMessage.innerText = 'It\'s a Draw!';
        winnerMessage.classList.add('draw');
    }
    winnerMessage.classList.remove('circle');
    winnerMessage.classList.remove('cross');
    if(nextTurn == 'player1') nextTurn = 'player2';
    else if(nextTurn == 'player2') nextTurn = 'player1';
    turn = '';
    resetButton.innerHTML = 'Play Again?';
    playArea.classList.add('end');
}

//BUTTON EVENTS HANDLER FUNCTIONS
//Play Button
const play = el => {
    el.parentElement.style.display = 'none';
    const playareaContainer = document.querySelector('#playarea-container');
    playareaContainer.style.display = 'flex';    
}
//Back Button
const landing = el => {
    resetBoard();
    turn = 'player1';
    el.parentElement.parentElement.style.display = 'none'
    const landingContainer = document.querySelector('#landing-container');
    landingContainer.style.display = 'flex';
}
//Reset Board Button
const resetBoard = () => {
    board = ['','','','','','','','',''];
    winnerMessage.classList.remove('playerWin');
    winnerMessage.classList.remove('draw');
    winnerMessage.innerText = '';
    resetButton.innerHTML = 'Reset Board';
    turn = nextTurn;
    playArea.classList.remove('end');
    renderBoard();
}