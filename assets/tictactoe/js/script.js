var board = ['','','','','','','','',''];
var player1 = 'X';
var player2 = 'O';
var turn = 'player1';
var nextTurn = 'player1';
var aiStartTurn = false;
var isBoardFull = false;
const winnerMessage = document.querySelector('#winner');
const resetButton = document.querySelector('#reset');
const playAreaContainer = document.querySelector('#playarea-container');
const fullscreen = document.querySelectorAll('.fullscreen');
var aiMode = false;

var scores = {
    scoreOne: 0,
    scoreTwo: 0
}

const scoreOneDisplay = document.querySelector('#player-1-score');
const scoreTwoDisplay = document.querySelector('#player-2-score');
const playArea = document.querySelector('.playarea');

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);


//TicTacToe is attached to window object
var aiBoard = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
aiPlayer = new TicTacToe.TicTacToeAIPlayer();
var aiTeam = aiBoard.oppositePlayer("X");

const makeAImove = () => {
    aiBoard = new TicTacToe.TicTacToeBoard(board);
    aiPlayer.initialize(aiTeam, aiBoard);
    var move = aiPlayer.makeMove();
    if(move != null){
        aiBoard.makeMove(aiTeam, move);
        board = aiBoard.board.slice();
    }
}
//Player vs Player Button
const play = el => {
    el.parentElement.style.display = 'none';
    const playareaContainer = document.querySelector('#playarea-container');
    playareaContainer.style.display = 'flex';   
    aiMode = false; 
}

//Player vs AI Button
const playAI = el => {
    el.parentElement.style.display = 'none';
    const playareaContainer = document.querySelector('#playarea-container');
    playareaContainer.style.display = 'flex';   
    aiMode = true;
    if(aiMode)document.querySelector('.names-banner .circle').innerText = 'Imp AI';
}

//Back Button
const landing = el => {
    nextTurn = 'player1';
    turn = 'player1';
    aiMode = false;
    resetBoard();
    scores.scoreTwo = scores.scoreOne = 0;
    renderScore();
    el.parentElement.parentElement.style.display = 'none';
    const landingContainer = document.querySelector('#landing-container');
    landingContainer.style.display = 'flex';
    document.querySelector('.names-banner .circle').innerText = 'Player 2';
}

//Reset Board Button
const resetBoard = () => {
    board = ['','','','','','','','',''];
    winnerMessage.classList.remove('playerWin');
    winnerMessage.classList.remove('draw');
    winnerMessage.innerText = '';
    if(!aiMode)turn = nextTurn;
    playArea.classList.remove('end');
    playArea.classList.remove('draw-bg');
    renderBoard();
    if(aiMode){
        if(turn == 'finish')aiStartTurn = !aiStartTurn;
        if(aiStartTurn){
            winnerMessage.innerText = "AI is thinking!";
            winnerMessage.classList.add('circle');
            turn = 'player1';
            setTimeout(() =>{
                makeAImove();
                renderBoard();
            }, 500)
        }else {
            winnerMessage.innerText = "Player 1\'s turn!";
            winnerMessage.classList.add('cross');
            turn = 'player1';
        }
    }
    resetButton.innerHTML = 'Reset Board';
}

//Maximize Button
const maximize = () => {
    if (fullscreen[0].innerText == 'Maximize'){
        openFullscreen();
    } else if(fullscreen[0].innerText == 'Minimize'){
        closeFullscreen();
    }
}

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        ///fire your event
        fullscreen[0].innerText = 'Maximize';
        fullscreen[1].innerText = 'Maximize';
        fullscreen[0].classList.remove('maximized');
        fullscreen[1].classList.remove('maximized');
    } else {
        fullscreen[0].innerText = 'Minimize';
        fullscreen[0].classList.add('maximized');
        fullscreen[1].innerText = 'Minimize';
        fullscreen[1].classList.add('maximized');
    }
}  

// Open Fullscreen
function openFullscreen() {
    if (playAreaContainer.requestFullscreen) {
        playAreaContainer.requestFullscreen();
    } else if (playAreaContainer.mozRequestFullScreen) { /* Firefox */
        playAreaContainer.mozRequestFullScreen();
    } else if (playAreaContainer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        playAreaContainer.webkitRequestFullscreen();
    } else if (playAreaContainer.msRequestFullscreen) { /* IE/Edge */
        playAreaContainer.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

//RENDER SCORE
const renderScore = () =>{
    scoreOneDisplay.innerHTML = scores.scoreOne;
    scoreTwoDisplay.innerHTML = scores.scoreTwo;
}
renderScore();

//RESET SCORE
const resetScore = () => {
    scores.scoreOne = 0;
    scores.scoreTwo = 0;
    renderScore();
}

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
        if(aiMode)winnerMessage.innerText = 'AI\'s turn!';
        else winnerMessage.innerText = 'Player 2\'s turn!';
    }
    checkBoardFull();
}

renderBoard();

//ADD MOVE
const addMove = (num) => {
    if(board[num] == ''){
        if(!aiMode){
            if(turn == 'player1'){
                board[num] = player1;
                turn = 'player2';
            } else if(turn == 'player2'){
                board[num] = player2;
                turn = 'player1';
            }
        } else {
            if(turn == 'player1'){
                board[num] = player1;
                makeAImove();
            }
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
        if(turn != "finish")scores.scoreOne++;
    } else if(result == player2){
        if(aiMode) winnerMessage.innerText = 'AI Wins!';
        else winnerMessage.innerText = 'Player 2 Wins!';
        winnerMessage.classList.add('playerWin');
        if(turn != "finish") scores.scoreTwo++;
    }else if(isBoardFull){
        winnerMessage.innerText = 'It\'s a Draw!';
        winnerMessage.classList.add('draw');
    }
    renderScore();
    winnerMessage.classList.remove('circle');
    winnerMessage.classList.remove('cross');
    if(nextTurn == 'player1') nextTurn = 'player2';
    else if(nextTurn == 'player2') nextTurn = 'player1';
    turn = 'finish';
    resetButton.innerHTML = 'Play Again?';
    if(isBoardFull) playArea.classList.add('draw-bg')
    else playArea.classList.add('end');
}
