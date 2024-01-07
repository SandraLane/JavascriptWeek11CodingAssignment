const playerX = 'PLAYER X Won';
const playerO = 'PLAYER O Won';
const tie = 'TIE';

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

document.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


    const winCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function winRound() {
        let end = false;
        for (let i = 0; i <= 7; i++) {
            let win = winCombo[i];
            let  a = board[win[0]];
            let b = board[win[1]];
            let c = board[win[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                end = true;
                break;
            }
            
        }

    if (end) {
            announce(currentPlayer === 'X' ? playerX : playerO);
            isGameActive = false;     
            return;
        }

    if (!board.includes(''))
        announce(tie);
    }
    //announce results
    const announce = (type) => {
        switch(type){
            case playerO:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case playerX:
               announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case tie:
                announcer.innerText = 'Tie';
        }
        //remove element from DOM to announce results
        announcer.classList.remove('hide');
    };
    
    //checking to see if turn is valid
    const isOkay = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };
    //current board assignment
    const currentBoard =  (index) => {
        board[index] = currentPlayer;
    }
    //check to see whose turn it is
    const takeTurns = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isOkay(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            currentBoard(index);
           winRound();
            takeTurns();
        }
    }
            
    //clearing board at end of game
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            takeTurns();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});