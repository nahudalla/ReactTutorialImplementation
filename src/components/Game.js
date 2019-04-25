import { useState, default as React } from 'react'
import Board from './Board'
import InfoPanel from './InfoPanel'

const PLAYER_1_CHAR = 'X';
const PLAYER_2_CHAR = 'O';
const INITIAL_CELL_VALUES = Array(9).fill(null);

const MAIN_DIAGONAL = [0, 4, 8]
const SECOND_DIAGONAL = [2, 4, 6]
const VERTICAL_LINES = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]
const HORIZONTAL_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]
const WINNER_LINES = [MAIN_DIAGONAL, SECOND_DIAGONAL, ...VERTICAL_LINES, ...HORIZONTAL_LINES]

export default function Game(props) {
  const [cellValuesHistory, setCellValuesHistory] = useState([INITIAL_CELL_VALUES])
  const [stepNumber, setStepNumber] = useState(0)

  const cellValues = cellValuesHistory[stepNumber]

  const winnerLineIndexes = calculateWinnerLine(cellValues)
  const currentPlayer = getCurrentPlayer(stepNumber)

  return (
    <div className="game">
      <Board
        cellValues={cellValues}
        winnerLineIndexes={winnerLineIndexes}
        onClick={handleBoardClick}
      />
      <InfoPanel
        stepNumber={stepNumber}
        onStepNumberChange={setStepNumber}
        currentPlayer={currentPlayer}
        cellValues={cellValues}
        winnerLineIndexes={winnerLineIndexes}
        cellValuesHistory={cellValuesHistory}
      />
    </div>
  );

  function handleBoardClick(i) {
    if (winnerLineIndexes || cellValues[i]) {
      return;
    }

    const newCellValues = cellValues.slice()

    newCellValues[i] = currentPlayer

    setCellValuesHistory(cellValuesHistory.slice(0, stepNumber + 1).concat([newCellValues]))
    setStepNumber(stepNumber + 1)
  }
}

function getCurrentPlayer(stepNumber) {
  return (stepNumber % 2 === 0) ? PLAYER_1_CHAR : PLAYER_2_CHAR
}

function calculateWinnerLine(cellValues) {
  for (let line of WINNER_LINES) {
    if (isWinnerLine(cellValues, line)) {
      return line;
    }
  }
  return null;
}

function isWinnerLine(cellValues, line) {
  const [cellA, cellB, cellC] = line

  if (cellValues[cellA] && cellValues[cellA] === cellValues[cellB] && cellValues[cellA] === cellValues[cellC]) {
    return true
  }

  return false
}
