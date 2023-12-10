document.addEventListener("DOMContentLoaded", () => {
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }

      return null;
    }

    function checkDraw() {
      return !gameBoard.includes("");
    }

    function handleCellClick(index) {
      if (gameBoard[index] === "" && !checkWinner() && !checkDraw()) {
        gameBoard[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
          alert(`Player ${winner} wins!`);
        } else if (checkDraw()) {
          alert("It's a draw!");
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          makeAiMove();
        }
      }
    }

    function makeAiMove() {
      const emptyCells = gameBoard.reduce((acc, val, index) => (val === "" ? [...acc, index] : acc), []);
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      gameBoard[randomIndex] = currentPlayer;
      renderBoard();

      const winner = checkWinner();
      if (winner) {
        alert(`Player ${winner} wins!`);
      } else if (checkDraw()) {
        alert("It's a draw!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }

    function renderBoard() {
      const board = document.getElementById("board");
      board.innerHTML = "";
      for (let i = 0; i < 9; i++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          if (gameBoard[i] === "X") {
            cell.classList.add("X");
          } else if (gameBoard[i] === "O") {
            cell.classList.add("O");
          }
          cell.textContent = gameBoard[i];
          cell.addEventListener("click", () => handleCellClick(i));
          board.appendChild(cell);
        }
    }

    renderBoard();
  });

  function restartGame() {
    location.reload(); 
  }

  function goToIndex() {
    window.location.href = "index.html";
  }