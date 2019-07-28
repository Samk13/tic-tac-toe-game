import React from 'react'
import Board from './Board'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? '\u274C' : '\uD83D\uDD35'
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move ' + move : 'Reset \uD83D\uDD04'
      return (
        <h1 key={move}>
          <button className="history-buttons" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </h1>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status =
        'Next is: ' +
        (this.state.xIsNext
          ? '\uD83D\uDC31\u200D\uD83D\uDC64 \u274C'
          : '\uD83D\uDC31\u200D\uD83D\uDCBB \uD83D\uDD35')
    }

    return (
      <div className="game">
        <div class="status-container">
          <h1>{status}</h1>
        </div>

        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <h3>{moves}</h3>
        </div>
      </div>
    )
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
