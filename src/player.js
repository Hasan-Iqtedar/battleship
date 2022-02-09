const Player = (isComputer = false) => {
  let turn = false;

  const getTurn = () => turn;
  const setTurn = (newTurn) => {
    turn = newTurn;
  };

  if (isComputer) {
    const guessRandomCoordinate = (rows, columns) => ({
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    });

    // const getRandomCoordinate = (rows, columns) => {
    //   let randomCoordinate;
    //   while (true) {
    //     randomCoordinate = guessRandomCoordinate(rows, columns);

    //     if ()

    //   }
    // };

    return { getTurn, setTurn, guessRandomCoordinate };
  }

  return { getTurn, setTurn };
};

export default Player;
