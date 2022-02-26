import GameModule from './game';

const DomHandler = (() => {
  let playerBoardGrid = null;
  const main = document.querySelector('.game-board-container');

  const updateComputerBoard = (e, computerBoard) => {
    const coordinate = {
      x: parseInt(e.target.getAttribute('data-row'), 10),
      y: parseInt(e.target.getAttribute('data-col'), 10),
    };

    if (computerBoard.receiveAttack(coordinate) === true) {
      e.target.style.cssText = 'background-color: maroon';
    } else {
      e.target.style.cssText = 'background-color: rgb(230, 230, 112)';
    }
    if (computerBoard.allShipsSunk()) {
      GameModule.setRunning(false);
    }
  };

  const updatePlayerBoard = (rows, columns, playerBoard, computerPlayer) => {
    const computerAttackCoordinate = computerPlayer.guessRandomCoordinate(
      rows,
      columns,
    );

    if (playerBoard.receiveAttack(computerAttackCoordinate) === true) {
      const cellRow = playerBoardGrid.querySelectorAll(
        `[data-row='${computerAttackCoordinate.x}']`,
      );
      cellRow.forEach((cell) => {
        if (cell.getAttribute('data-col') == computerAttackCoordinate.y) {
          cell.style.cssText = 'background-color: maroon';
        }
      });
    } else {
      const cellRow = playerBoardGrid.querySelectorAll(
        `[data-row='${computerAttackCoordinate.x}']`,
      );

      cellRow.forEach((cell) => {
        if (cell.getAttribute('data-col') == computerAttackCoordinate.y) {
          cell.style.cssText = 'background-color: rgb(230, 230, 112)';
        }
      });
    }

    if (playerBoard.allShipsSunk()) {
      GameModule.setRunning(false);
    }
  };

  const initialize = (
    rows,
    columns,
    playerShips,
    playerBoard,
    computerBoard,
    computerPlayer,
  ) => {
    const gameBoard1 = document.createElement('div');
    const gameBoard2 = document.createElement('div');
    gameBoard1.classList.add('game-board');
    gameBoard2.classList.add('game-board');

    gameBoard1.id = 'player-board';

    main.append(gameBoard1, gameBoard2);
    playerBoardGrid = document.querySelector('#player-board');

    const gameboards = document.getElementsByClassName('game-board');
    gameboards[0].style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;
    gameboards[1].style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;

    const handler = (e) => {
      updateComputerBoard(e, computerBoard);
      updatePlayerBoard(rows, columns, playerBoard, computerPlayer);
    };

    const endGame = () => {
      if (GameModule.isRunning() === false) {
        console.log('Hello ending....');
        gameboards[1].childNodes.forEach((cell) => {
          cell.removeEventListener('click', handler);
          cell.removeEventListener('click', endGame);
        });

        const endingLine = document.querySelector('h3');
        endingLine.textContent = 'The End';
      }
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cell1 = document.createElement('div');
        const cell2 = document.createElement('div');
        cell1.classList.add('cell');
        cell2.classList.add('cell');

        cell1.setAttribute('data-row', `${i}`);
        cell2.setAttribute('data-row', `${i}`);

        cell1.setAttribute('data-col', `${j}`);
        cell2.setAttribute('data-col', `${j}`);

        cell2.addEventListener('click', handler);
        cell2.addEventListener('click', endGame);

        computerBoard.getPlayerShips().forEach((ship) => {
          ship.coordinates.forEach((element) => {
            if (element.x === i && element.y === j) {
              cell2.style.cssText = 'background-color: blue';
            }
          });
        });

        playerShips.forEach((ship) => {
          ship.coordinates.forEach((element) => {
            if (element.x === i && element.y === j) {
              cell1.style.cssText = 'background-color: black';
            }
          });
        });

        gameboards[0].appendChild(cell1);
        gameboards[1].appendChild(cell2);
      }
    }
  };
  return {
    initialize,
  };
})();

export default DomHandler;
