import {Component} from 'react'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: 25,
      seconds: 0,
      status: false,
      limit: 25,
    }
    this.timerKey = null
  }

  clickStartPause = () => {
    const {status} = this.state
    this.setState(p => ({status: !p.status}))
    if (status) {
      clearInterval(this.timerKey)
    } else {
      this.timerKey = setInterval(() => {
        this.timer()
      }, 1000)
    }
  }

  clickReset = () => {
    const {status} = this.state
    this.setState({minutes: 25, seconds: 0, status: false, limit: 25})
    if (status) {
      clearInterval(this.timerKey)
    }
  }

  clickMinus = () => {
    const {status} = this.state
    if (!status) {
      this.setState(p => ({limit: p.limit - 1, minutes: p.limit - 1}))
    }
  }

  clickPlus = () => {
    const {status} = this.state
    if (!status) {
      this.setState(p => ({limit: p.limit + 1, minutes: p.limit + 1}))
    }
  }

  timer = () => {
    const {minutes, seconds} = this.state

    if (minutes > 0 && seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    } else if (minutes > 0 && seconds === 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }))
    } else if (minutes === 0 && seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    } else {
      this.clickStartPause()
    }
  }

  render() {
    const {minutes, seconds, status, limit} = this.state

    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <h1>
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </h1>
          <p>{!status ? 'Paused' : 'Running'}</p>
        </div>

        <div>
          <div>
            {status ? (
              <div>
                <button type="button" onClick={this.clickStartPause}>
                  <img
                    alt="pause icon"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                  />
                  Pause
                </button>
              </div>
            ) : (
              <div>
                <button type="button" onClick={this.clickStartPause}>
                  <img
                    alt="play icon"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                  />
                  Start
                </button>
              </div>
            )}
          </div>
          <div>
            <div>
              <button type="button" onClick={this.clickReset}>
                <img
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
              </button>
              <p>Reset</p>
            </div>
          </div>
        </div>
        <p>Set Timer Limit</p>
        <div>
          <button type="button" onClick={this.clickMinus}>
            -
          </button>
          <p>{limit}</p>
          <button type="button" onClick={this.clickPlus}>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
