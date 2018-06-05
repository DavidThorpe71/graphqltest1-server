import mongoose from 'mongoose';
import { db } from './db';
import loadModels from './models';

export default () => {
  const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db)
      .then(() => {
        console.log('Successfully connected to ', db);
      }).catch((error) => {
        console.error('Error connecting to database: ', error);
        process.exit(1);
      }
      );
  };
  connect();

  mongoose.connection.on('disconnected', connect);

  loadModels();
};

