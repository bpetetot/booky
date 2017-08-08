#!/usr/bin/env node --harmony
require('dotenv').config()

process.on('unhandledRejection', r => console.log(r))

const server = require('./server')

server.init()
