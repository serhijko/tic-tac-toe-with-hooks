import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers/calculateWinner';

const Game = () => {
  const initialHistory = [
    { squares: Array(9).fill(null) }
  ];
  const [history, setHistory] = useState(initialHistory);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const currentStep = slicedHistory[slicedHistory.length - 1];
    const newSquares = [...currentStep.squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squaresAlreadyFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squaresAlreadyFilled) return;
    
    newSquares[i] = xIsNext ? '❌' : '⭕';
    const newStep = { squares: newSquares };
    const newHistory = [...slicedHistory, newStep];

    setHistory(newHistory);
    setStepNumber(slicedHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  const moves = history.map((step, move) => {
    const description = Boolean(move)
      ? `Go to move #${move}`
      : `Go to game start`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const currentStep = history[stepNumber];
  const winner = calculateWinner(currentStep.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? '❌' : '⭕'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentStep.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
