import DomHandler from './domHandler';

const ShipPlacementHandler = (() => {
  let orientation = 'horizontal';

  const maxShips = 4;
  let status = false;
  let numShips = 0;

  const shipNames = ['submarine', 'battleship', 'fighter', 'carrier'];
  const shipLengths = [4, 3, 2, 3];
  const main = document.querySelector('.game-board-container');

  let length = shipLengths[0];
  let name = shipNames[0];

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

  const setName = (newName) => {
    name = newName;
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

      // console.log(cell.classList);

      if (cell.classList.contains('occupied-cell')) {
        cell.classList.add('ship-placement-cell-invalid');
      } else if (getOrientation() === 'horizontal') {
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
        cell.classList.add('occupied-cell');
        cell.classList.remove('ship-placement-cell');
      });

      if (coordinates.length > 0) {
        playerBoard.placeShip(getName(), getLength(), coordinates);

        setNumShips(getNumShips() + 1);
        setName(shipNames[getNumShips()]);
        setLength(shipLengths[getNumShips()]);

        // console.log(getLength());

        const line = document.querySelector('#input-line');
        line.textContent = `Place your ${getName()}`;
      }

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

    line.id = 'input-line';

    btn.classList.add('rotate-btn');
    btn.addEventListener('click', toggleOrinetation);

    line.textContent = 'Place your Submarine';
    btn.textContent = 'Rotate';

    container.append(line, btn);
    main.append(board, container);

    renderCells(board, rows, columns, playerBoard, computerBoard, computerPlayer);
  };

  return { inputShipsToBePlaced };
})();

export default ShipPlacementHandler;
