import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isRunning: false, timeElapsedInSeconds: 0}

  onStart = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState({isRunning: true})
  }

  onStop = () => {
    const {isRunning} = this.state
    clearInterval()
    if (isRunning) {
      this.clearTimerInterval()
    }
    this.setState({isRunning: false})
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onReset = () => {
    this.clearTimerInterval()

    this.setState({
      isRunning: false,
      timeElapsedInSeconds: 0,
    })
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = timeElapsedInSeconds % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-title-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              className="timer-icon"
              alt="stopwatch"
            />
            <p className="para">Timer</p>
          </div>
          <h1 className="display-time">
            {this.getElapsedSecondsInTimeFormat()}
          </h1>
          <div className="buttons-container">
            <button
              type="button"
              className="start-btn"
              onClick={this.onStart}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              type="button"
              className="stop-btn"
              onClick={this.onStop}
              disabled={!isRunning}
            >
              Stop
            </button>
            <button type="button" className="reset-btn" onClick={this.onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
