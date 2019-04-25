import { useState, default as React } from 'react'

import HistoryList from './HistoryList'

export default function Infopanel({ stepNumber, onStepNumberChange, currentPlayer, cellValues, winnerLineIndexes, cellValuesHistory }) {
  const [reverseOrder, setReverseOrder] = useState(false)

  return (
    <div className="game-info">
      <GameStatus cellValues={cellValues} winnerLineIndexes={winnerLineIndexes} player={currentPlayer} />
      <label>
        <input type="checkbox" checked={reverseOrder} onChange={handleReverseOrderChange} />
        Reverse order
      </label>
      <HistoryList cellValuesHistory={cellValuesHistory} stepNumber={stepNumber} reverseOrder={reverseOrder} onClick={onStepNumberChange} />
    </div>
  )

  function handleReverseOrderChange(e) {
    const newValue = e.target.checked
    setReverseOrder(newValue)
  }
}

function GameStatus({ cellValues, winnerLineIndexes, player }) {
  const winner = winnerLineIndexes && cellValues[winnerLineIndexes[0]]

  let status
  if (winner) {
    status = <b>Winner: {winner}</b>
  } else if (isBoardFull(cellValues)) {
    status = <b>It's a draw</b>
  } else {
    status = <span><b>Current player: </b> {player}</span>
  }

  return <div>{status}</div>
}

function isBoardFull(cellValues) {
  for (let value of cellValues) {
    if (value === null) {
      return false
    }
  }

  return true
}
