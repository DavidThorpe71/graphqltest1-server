import 'babel-register';
import 'babel-polyfill';
import express from 'express'
import express_graphql from 'express-graphql';
import logger from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ENV from './config/env';
import mongoose from 'mongoose';
import winston from 'winston';
import schema from './graphql';

const app = express();

const db = process.env.MONGODB_URI || 'mongodb://localhost/graphql-test1';

mongoose.connect(db)
  .then(() => {
    console.log('MongoDB is connected to the database', db);
  }).catch((error) => {
    throw error;
  })

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

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

app.use('/graphql', express_graphql({
  schema,
  graphiql: true,
  pretty: true
}))
