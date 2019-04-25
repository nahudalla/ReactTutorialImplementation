import React from 'react'

export default function HistoryList(props) {
  const { cellValuesHistory, stepNumber, reverseOrder } = props

  const items = []

  for (let i = 0; i < cellValuesHistory.length; ++i) {
    items.push(generateHistoryListItem(i, props))
  }

  if (reverseOrder) items.reverse()

  return (
    <ol reversed={reverseOrder}>
      {items}
    </ol>
  )
}

function generateHistoryListItem(index, { cellValuesHistory, stepNumber, onClick }) {
  const { row, column, player } = index && calculateHistoryDifference(cellValuesHistory[index], cellValuesHistory[index - 1])
  const selected = index === stepNumber
  return (
    <HistoryListItem
      key={index}
      index={index}
      row={row}
      column={column}
      player={player}
      selected={selected}
      onClick={onClick} />
  )
}

function calculateHistoryDifference(stateA, stateB) {
  for (let i = 0; i < stateA.length; ++i) {
    if (stateA[i] !== stateB[i]) {
      const row = Math.floor(i / 3)
      return {
        row,
        column: i - (row * 3),
        player: stateA[i] || stateB[i]
      }
    }
  }
}

function HistoryListItem(props) {
  const { index, selected } = props
  const onClick = () => props.onClick(index)

  let buttonText = generateTextForHistoryListItem(props)
  if (selected) {
    buttonText = <b>{buttonText}</b>
  }

  return (
    <li>
      <button onClick={onClick}>
        {buttonText}
      </button>
    </li>
  )
}

function generateTextForHistoryListItem({ index, row, column, player }) {
  if (index === 0) {
    return `Go to game start`
  } else {
    return `Go to move #${index} (${row},${column}): ${player}`
  }
}
