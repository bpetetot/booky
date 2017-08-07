import React from 'react'
import ReactDOM from 'react-dom'

import 'cuicui/lib/cuicui.css'
import './index.css'

import App from './app'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
