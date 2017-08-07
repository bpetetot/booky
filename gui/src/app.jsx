import React, { Component } from 'react'
import { Navbar, Panel } from 'cuicui'

import Scanner from './components/scanner'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { scanned: false, code: undefined }
    this.handleDetect = this.handleDetect.bind(this)
    this.changeCode = this.changeCode.bind(this)
    this.rescan = this.rescan.bind(this)
    this.stopScan = this.stopScan.bind(this)
  }

  handleDetect({ codeResult }) {
    this.changeCode(codeResult.code)
  }

  changeCode(code) {
    this.setState({ scanned: false, code })
  }

  rescan() {
    this.setState({ scanned: true, code: undefined })
  }

  stopScan() {
    this.setState({ scanned: false })
  }

  render() {
    const { scanned, code } = this.state
    return (
      <div>
        <Navbar logo="📚 Booky" />
        <div className="app-content">
          <Panel title="ISBN Scanner">
            {scanned &&
              <div>
                <Scanner onDetect={this.handleDetect} />
                <input type="button" defaultValue="close" onClick={this.stopScan} />
              </div>}
            {!scanned &&
              <div>
                <input
                  type="text"
                  defaultValue={code}
                  onChange={e => this.changeCode(e.target.value)}
                />
                <input type="button" defaultValue="validate" />
                <input type="button" defaultValue="scan" onClick={this.rescan} />
              </div>}
          </Panel>
        </div>
      </div>
    )
  }
}

export default App
