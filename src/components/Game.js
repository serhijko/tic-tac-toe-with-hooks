import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers/calculateWinner';

const Game = () => {
  const initialHistory = [{
    squares: Array(9).fill(null),
  }];
  const [history, setHistory] = useState(initialHistory);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = i => {
    const current = history[history.length - 1];
    const newSquares = [...current.squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squaresAlreadyFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squaresAlreadyFilled) return;
    
    newSquares[i] = xIsNext ? '❌' : '⭕';
    setHistory(history.concat([{
        squares: newSquares,
      }]),
    );
    setXIsNext(!xIsNext);
  }

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? '❌' : '⭕'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
