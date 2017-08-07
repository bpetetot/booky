import React, { Component } from 'react'
import { Navbar, Panel } from 'cuicui'

import Scanner from './components/scanner'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { scanned: true, code: undefined, book: undefined }
    this.handleDetect = this.handleDetect.bind(this)
    this.changeCode = this.changeCode.bind(this)
    this.rescan = this.rescan.bind(this)
    this.stopScan = this.stopScan.bind(this)
    this.fetchBook = this.fetchBook.bind(this)
  }

  handleDetect({ codeResult }) {
    this.changeCode(codeResult.code)
  }

  changeCode(code) {
    this.setState({ scanned: true, code })
  }

  rescan() {
    this.setState({ scanned: false, code: undefined })
  }

  stopScan() {
    this.setState({ scanned: true })
  }

  async fetchBook() {
    const response = await fetch(`/api/books/${this.state.code}`)
    const book = await response.json()
    this.setState(() => ({ book }))
  }

  render() {
    const { scanned, code, book } = this.state
    return (
      <div>
        <Navbar logo="📚 Booky" />
        <div className="app-content">
          <Panel title="ISBN Scanner">
            {!scanned &&
              !book &&
              <div>
                <Scanner onDetect={this.handleDetect} />
                <input type="button" defaultValue="close" onClick={this.stopScan} />
              </div>}
            {scanned &&
              !book &&
              <div>
                <input
                  type="text"
                  defaultValue={code}
                  onChange={e => this.changeCode(e.target.value)}
                />
                <input type="button" defaultValue="validate" onClick={this.fetchBook} />
                <input type="button" defaultValue="scan" onClick={this.rescan} />
              </div>}
            {book &&
              <div>
                {book.title}
                {book.cover && book.cover.medium && <img src={book.cover.medium} alt="cover" />}
              </div>}
          </Panel>
        </div>
      </div>
    )
  }
}

export default App
