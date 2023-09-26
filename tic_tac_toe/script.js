const Player = (sign, level = 'easy', status = false) => {
    const playerSign = sign;
    const isAi = status;
    const getLevelDifficulty = () => {
        if (level === 'easy') return 1;
        if (level === 'medium') return 3;
        if (level === 'hard') return 7;
        if (level === 'unbeatable') return Infinity;
        return 4;
    }
    const aiLevel = getLevelDifficulty();
    const getSign = () => playerSign;
    const getAiStatus = () => isAi;
    const getAiLevel = () => aiLevel;
    return { getSign, getAiLevel, getAiStatus };
};

const gameBoard = (() => {
    let playerX = Player('x');
    const playerO = Player('o');
    let player = playerX;
    const board = new Array(9).fill(undefined);
    const getCell = (id) => {
        return board[id];
    }

    const createPlayer = (level, isAi) => {
        playerX = Player('x', level, isAi);
        player = playerX;
    };

    const getCurrentBoard = () => board;

    const getCurrentPlayerSign = () => player.getSign();

    const swtichPlayer = () => {
        player = (player === playerX) ? playerO : playerX;
    }

    const setCell = (index, currentPlayer = player) => {
        if (board[index] === undefined) {
            board[index] = currentPlayer.getSign();
            return true;
        }
        return false;
    }

    function getAiMove() {
        const difficulty = player.getAiLevel();
        console.log(difficulty);
        const currentPlayerSign = getCurrentPlayerSign();
        const availableMoves = getCurrentBoard()
            .map((cell, index) => cell === undefined ? index : null)
            .filter(move => move !== null);
        const randomNumber = getRandomNumber();

        let bestScore = -Infinity;
        let bestMove;

        console.log(`RandomNum: ${randomNumber} & difficluyt: ${difficulty}`);
        if (difficulty > randomNumber) {
            console.log('clalsdl');
            for (const move of availableMoves) {
                const boardCopy = [...getCurrentBoard()];
                boardCopy[move] = currentPlayerSign;

                const score = minimax(boardCopy, false);

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
        } else {
            return randomNumber;
        }

        return bestMove;

        function getRandomNumber() {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 9);
            } while (!availableMoves.includes(randomIndex));
            return randomIndex;
        }

    }

    function minimax(board, isMaximizing) {
        const scores = {
            'x': 1,
            'o': -1,
            'tie': 0
        };

        const winner = checkWinner(board);
        if (winner !== undefined) {
            return scores[winner];
        }

        if (isMaximizing) {
            let maxScore = -Infinity;
            board.forEach((cell, index) => {
                if (cell === undefined) {
                    board[index] = 'x';
                    const score = minimax(board, false);
                    board[index] = undefined;
                    maxScore = Math.max(score, maxScore);
                }
            });
            return maxScore;
        } else {
            let minScore = Infinity;
            board.forEach((cell, index) => {
                if (cell === undefined) {
                    board[index] = 'o';
                    const score = minimax(board, true);
                    board[index] = undefined;
                    minScore = Math.min(score, minScore);
                }
            });
            return minScore;
        }
    }


    function checkWinner(board = getCurrentBoard()) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];// Return the winning player (either 'X' or 'O')
            }
        }

        return board.includes(undefined) ? undefined : 'tie';
    }

    function resetGameBoard(timeout = 1500) {
        board.fill(undefined);
        player = playerX;
        setTimeout(() => {
            play();
        }, timeout);
    }

    function play(index) {
        let move = player.getAiStatus() ? getAiMove() : index;
        if (move === undefined || move === null) return;
        setCell(move);
        displayController.updateUI();

        swtichPlayer();
        const winner = checkWinner();
        if (winner) {
            displayController.showWinningSequence(winner);
            return;
        };
        if (player.getAiStatus()) play();
    }

    return { getCell, getCurrentPlayerSign, resetGameBoard, getCurrentBoard, play, createPlayer };
})();


const displayController = (() => {
    const dialog = document.getElementById('dialog');
    const dialogContent = document.getElementById('dialogContent');
    const restartBtn = document.getElementById('restart');
    const setting = document.getElementById('setting');
    const gridCont = document.getElementById('gridCont');

    gridCont.addEventListener('click', e => handleMove(e));
    setting.addEventListener('click', () => {
        injectStartDialogHTML();
        toggleOverlay();
    });
    restartBtn.addEventListener('click', () => {
        resetGame(150);
    });

    function toggleOverlay() {
        let overlay = document.getElementById('overlay');
        overlay.classList.toggle('hidden');
        if (!dialog.classList.contains('hideDialog')) {
            dialogContent.classList.add('hidden');
            setTimeout(() => {
                dialog.classList.add('hideDialog');
            }, 350);
        } else {
            dialog.classList.remove('hideDialog');
            setTimeout(() => {
                dialogContent.classList.remove('hidden');
            }, 350);

        }
        if (!dialogContent.classList.contains('gridChange')) {
            dialogContent.classList.add('gridChange');
        }
    }

    function startGameHandler(timeout = 100) {
        toggleOverlay();
        const PvE = document.getElementById('PvE');
        const checkedRadioButton = document.querySelector('input[name="level"]:checked');
        if (PvE.checked) {
            gameBoard.createPlayer(checkedRadioButton.id, true);
            setTimeout(() => {
                gameBoard.play();
                updateUI();
            }, timeout);
        } else {
            gameBoard.createPlayer('easy', false);
        };
    }
    injectStartDialogHTML();
    startGameHandler();

    function handleMove(e) {
        if (e.target.classList.contains('btn')) {
            let clickedDiv = document.getElementById(e.target.id);
            if (!clickedDiv.classList.contains('clicked')) {
                gameBoard.play(e.target.id);
            }
        }
    }

    function updateUI() {
        let board = gameBoard.getCurrentBoard();
        board.forEach((e, index) => {
            if (e) {
                let div = document.getElementById(index);
                if (!div.classList.contains('clicked')) {
                    div.classList.add('hideimage');
                    div.innerHTML = ` <img src="assets/${e}.svg" alt="">`;
                    setTimeout(() => {
                        div.classList.remove('hideimage');
                    }, 20);
                    div.classList.add('clicked');
                }
            }
        });
    }

    function showWinningSequence(winner) {
        setTimeout(() => {
            toggleOverlay();
        }, 400);
        injectRoundEndHTML(winner);
        setTimeout(() => {
            resetGame();
        }, 600);
        setTimeout(() => {
            toggleOverlay();
        }, 2000);
    }

    function injectStartDialogHTML() {
        dialogContent.classList.remove('restart');
        dialogContent.innerHTML = `<h2>Make Your Choice</h2>
        <div class="mode">
            <p>Opponent:</p>
            <div id="inputCont">
                <label for="PvE">
                    <input type="radio" name="mode" id="PvE">
                    <img src="assets/bot.svg" alt="">
                </label>
                <label for="PvP">
                    <input type="radio" name="mode" id="PvP" checked>
                    <img src="assets/person.svg" alt="">
                </label>
            </div>
        </div>
        <div class="botLevel hide" id="botLevel">
            <p>Difficulty Level</p>
            <div>
            <label for="easy">
                <input type="radio" name="level" id="easy" checked>
                <div>Easy</div>
    
            </label>
            <label for="medium">
                <input type="radio" name="level" id="medium">
                <div>Medium</div>
    
            </label>
            <label for="hard">
                <input type="radio" name="level" id="hard">
                <div>Hard</div>
    
            </label>
            <label for="unbeatable">
                <input type="radio" name="level" id="unbeatable">
                <div>Unbeatable</div>
    
            </label>
            </div>
        </div>
        <button id="startBtn">Start Game</button>`;
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', () => {
            resetGame();
            startGameHandler(600);
        });
        const PvP = document.getElementById('PvP');
        const PvE = document.getElementById('PvE');
        PvP.addEventListener('change', toggleLevelSelector);
        PvE.addEventListener('change', toggleLevelSelector);
    }


    function toggleLevelSelector() {
        const PvE = document.getElementById('PvE');
        let element = document.getElementById('botLevel');
        if (PvE.checked) {
            dialogContent.classList.remove('gridChange');
            element.classList.remove('hide');
        } else {
            dialogContent.classList.add('gridChange');
            element.classList.add('hide');
        }
    }

    function resetGame(timeout = 1500) {
        gameBoard.resetGameBoard(timeout);
        let divs = document.querySelectorAll('.btn');
        divs.forEach(div => {
            if (div.classList.contains('clicked')) {
                div.innerHTML = '';
                div.classList.remove('clicked');
            }
        });
    }


    function injectRoundEndHTML(e) {
        dialogContent.classList.add('restart');
        dialogContent.innerHTML = e === 'tie' ? `<h1>It's a tie</h1>` : `<h1>${e.toUpperCase()} Win</h1>`;
    }

    return { updateUI, showWinningSequence };
})();

