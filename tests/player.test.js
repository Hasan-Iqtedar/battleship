import Player from '../src/player';

test('Computer player guesses a random coordinate of the gameboard', () => {
  const ai = Player(true);
  const guess = ai.guessRandomCoordinate(10, 10);
  expect(guess.x).toBeTruthy();
  expect(guess.y).toBeTruthy();
});
