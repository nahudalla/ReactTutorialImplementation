import React from 'react'

export default class Board extends React.Component {
  render () {
    return (
      <div className='game-board'>
        {this.generateRows()}
      </div>
    )
  }

  generateRows () {
    const rows = []

    for (let row = 0; row < 3; ++row) {
      rows.push(
        this.generateRow(row)
      )
    }

    return rows
  }

  generateRow (row) {
    return (
      <div className='board-row' key={row}>
        {this.generateCellsForRow(row)}
      </div>
    )
  }

  generateCellsForRow (row) {
    const cells = []

    for (let column = 0; column < 3; ++column) {
      cells.push(
        this.generateCell(row, column)
      )
    }

    return cells
  }

  generateCell (row, column) {
    const cellNumber = (3 * row) + column
    const { cellValues, winnerLineIndexes } = this.props

    return (
      <Square key={cellNumber}
        value={cellValues[cellNumber]}
        highlighted={winnerLineIndexes && winnerLineIndexes.includes(cellNumber)}
        onClick={() => this.props.onClick(cellNumber)}
      />
    )
  }
}

function Square (props) {
  let className = 'square'
  if (props.highlighted) className += ' highlighted'
  return (
    <button className={className} onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}
