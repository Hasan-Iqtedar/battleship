const GameModule = (() => {
  let running = true;

  const isRunning = () => running;
  const setRunning = (value) => { running = value; };

  return {
    isRunning, setRunning,
  };
})();

export default GameModule;
