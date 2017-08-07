import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Quagga from 'quagga'

import './scanner.css'

class Scanner extends Component {
  async componentDidMount() {
    Quagga.init(
      {
        frequency: 5,
        numOfWorkers: 2,
        locate: true,
        decoder: { readers: ['ean_reader'] },
        locator: {
          halfSample: true,
          patchSize: 'medium',
        },
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: this.scannerContainer,
          constraints: {
            width: 768,
            height: 432,
            facingMode: 'environment',
          },
          area: {
            top: '0%',
            right: '0%',
            left: '0%',
            bottom: '0%',
          },
        },
      },
      () => {
        Quagga.onDetected(this.props.onDetect)
        Quagga.start()
      },
    )
  }

  componentWillUnmount() {
    Quagga.stop()
  }

  render() {
    return (
      <div
        className="scanner"
        ref={(e) => {
          this.scannerContainer = e
        }}
      >
        <div className="scanner-line" />
      </div>
    )
  }
}

Scanner.propTypes = {
  onDetect: PropTypes.func.isRequired,
}

export default Scanner
