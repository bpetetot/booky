import React, { Component } from 'react'
import Scanner from './components/scanner'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { scan: true, code: undefined }
    this.handleDetect = this.handleDetect.bind(this)
    this.rescan = this.rescan.bind(this)
  }

  handleDetect(code) {
    this.setState({ scan: false, code })
  }

  rescan() {
    this.setState({ scan: true, code: undefined })
  }

  render() {
    const { scan, code } = this.state
    return (
      <div>
        <h1>ISBN scanner</h1>
        {code && <b>{code}</b>}
        {scan && <Scanner onDetect={this.handleDetect} />}
        {!scan && <input type="button" onClick={this.rescan} value="scan" />}
      </div>
    )
  }
}

export default App
