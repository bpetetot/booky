import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Quagga from 'quagga'

class Scanner extends Component {
  constructor(props) {
    super(props)
    this.handleDetect = this.handleDetect.bind(this)
  }

  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: this.scan,
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
          area: {
            // defines rectangle of the detection/localization area
            top: '0%', // top offset
            right: '0%', // right offset
            left: '0%', // left offset
            bottom: '0%', // bottom offset
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      () => {
        Quagga.start()
        Quagga.onDetected(this.handleDetect)
      },
    )
  }

  componentWillUnmount() {
    Quagga.stop()
  }

  handleDetect({ codeResult }) {
    this.props.onDetect(codeResult.code)
    Quagga.stop()
  }

  render() {
    return (
      <div
        ref={(e) => {
          this.scan = e
        }}
      />
    )
  }
}

Scanner.propTypes = {
  onDetect: PropTypes.func.isRequired,
}

export default Scanner
