import DomHandler from './domHandler';

const ShipPlacementHandler = (() => {
  let orientation = 'horizontal';
  let length = 3;
  const name = 'submarine';
  const maxShips = 4;
  let status = false;
  let numShips = 0;

  const main = document.querySelector('.game-board-container');

  const getOrientation = () => orientation;
  const getLength = () => length;
  const getName = () => name;
  const getStatus = () => status;
  const getNumShips = () => numShips;

  const setOrinetation = (newOrinetation) => {
    orientation = newOrinetation;
  };

  const setLength = (newLength) => {
    length = newLength;
  };

  const setStatus = (newStatus) => {
    status = newStatus;
  };

  const setNumShips = (num) => {
    numShips = num;
  };

  const toggleOrinetation = () => {
    if (getOrientation() === 'horizontal') {
      setOrinetation('vertical');
    } else {
      setOrinetation('horizontal');
    }
    console.log(getOrientation());
  };

  const renderCells = (board, rows, columns, playerBoard, computerBoard, computerPlayer) => {
    const mouseoverhandler = (e) => {
      let cell = e.target;
      const colIndex = cell.getAttribute('data-col');

      if (getOrientation() === 'horizontal') {
        if (colIndex <= columns - getLength()) {
          for (let i = 0; i < getLength(); i++) {
            cell.classList.add('ship-placement-cell');
            cell = cell.nextSibling;
          }
        } else {
          cell.classList.add('ship-placement-cell-invalid');
        }
      } else {
        let rowIndex = cell.getAttribute('data-row');
        let row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);

        if (rowIndex <= rows - getLength()) {
          for (let i = 0; i < getLength(); i++) {
            cell.classList.add('ship-placement-cell');
            row.forEach((element) => {
              if (element.getAttribute('data-col') == colIndex) {
                cell = element;
              }
            });
            rowIndex++;
            row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);
          }
        } else {
          cell.classList.add('ship-placement-cell-invalid');
        }
      }
    };

    const mouseoutHandler = (e) => {
      let cell = e.target;
      const colIndex = cell.getAttribute('data-col');

      if (getOrientation() === 'horizontal') {
        if (colIndex <= columns - getLength()) {
          for (let i = 0; i < getLength(); i++) {
            cell.classList.remove('ship-placement-cell');
            cell = cell.nextSibling;
          }
        } else {
          cell.classList.remove('ship-placement-cell-invalid');
        }
      } else {
        let rowIndex = cell.getAttribute('data-row');
        let row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);

        for (let i = 0; i < getLength(); i++) {
          cell.classList.remove('ship-placement-cell');
          row.forEach((element) => {
            if (element.getAttribute('data-col') == colIndex) {
              cell = element;
            }
          });
          rowIndex++;
          row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);
        }
      }
    };

    const clickHandler = (e) => {
      const cells = document.querySelectorAll('.ship-placement-cell');
      const coordinates = [];

      cells.forEach((cell) => {
        const coordinate = {
          x: parseInt(cell.getAttribute('data-row'), 10),
          y: parseInt(cell.getAttribute('data-col'), 10),
        };
        coordinates.push(coordinate);
        cell.style.cssText = 'background-color: rgba(0,0,0,0.7)';
      });
      playerBoard.placeShip('submarine', 3, coordinates);

      setNumShips(getNumShips() + 1);

      if (getNumShips() === maxShips) {
        setStatus(true);
      }

      if (getStatus() === true) {
        main.innerHTML = '';

        DomHandler.initialize(
          10,
          10,
          playerBoard.getPlayerShips(),
          playerBoard,
          computerBoard,
          computerPlayer,
        );
      }
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', `${i}`);
        cell.setAttribute('data-col', `${j}`);

        cell.addEventListener('mouseover', mouseoverhandler);
        cell.addEventListener('mouseout', mouseoutHandler);
        cell.addEventListener('click', clickHandler);

        board.appendChild(cell);
      }
    }
  };

  const inputShipsToBePlaced = (playerBoard, computerBoard, computerPlayer) => {
    const rows = 10;
    const columns = 10;

    const board = document.createElement('div');
    const container = document.createElement('div');

    board.classList.add('game-board');
    container.classList.add('container');

    board.style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;

    const btn = document.createElement('button');
    const line = document.createElement('h2');

    btn.classList.add('rotate-btn');
    btn.addEventListener('click', toggleOrinetation);

    line.textContent = `Place your ${getName()}`;
    btn.textContent = 'Rotate';

    container.append(line, btn);
    main.append(board, container);

    renderCells(board, rows, columns, playerBoard, computerBoard, computerPlayer);
  };

  return { inputShipsToBePlaced };
})();

export default ShipPlacementHandler;
