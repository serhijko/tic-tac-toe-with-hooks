/**
 * calculateWinner (helper function)
 * 
 * Parameters: squares (array of '❌', '⭕', or null)
 * Return value: '❌' : '⭕' or null
 */
export function calculateWinner(squares) {
  /* Squares indexes as they appear in UI:
  0 1 2
  3 4 5
  6 7 8
  */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // shows all of the winning combinations ("lines")

  // Iterate over all the winning line combinations to see if the
  // input squares array has one of the with all '❌'s or all '⭕'s.
  // If it does, return '❌' or '⭕'.
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  // If none of the winning line combinations is contained in
  // input squares array, return null...
  return null;
}
