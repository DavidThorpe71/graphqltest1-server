import 'babel-register';
import 'babel-polyfill';
import express from 'express'
import graphqlHTTP from 'express-graphql';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose'
import logger from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';
import ENV from './config/env';
import winston from 'winston';
import schema from './graphql/register-api';
import loadModels from './database/models/index';
import connect from './database/connect';
import expressValidator from 'express-validator';
import './database/passport';

const app = express();

connect()

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(expressValidator());
app.use(session({
  genid: function (req) {
    return uuid.v4();
  },
  secret: 'HELLOTHEREDAVEYT',
  resave: false,
  saveUninitialized: true,
  cookie: { sercure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

const debug = require('debug')('datazone:server');
const http = require('http');

const port = 4000;
app.set('port', port)

const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  winston.info('Server running on port ' + addr.port + ' in ' + ENV + ' mode.');
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/* ===============================================
Event listener for HTTP server "error" event.
=============================================== */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true
}))
