//Import Model from database
import Resolution from '../../database/models/Resolution';

// These two lines added a test resolution to the database
// const testResolution = new Resolutions({ _id: '56785695', name: 'Tester' });
// testResolution.save();

export default {
  Query: {
    // This gets resolutions from the database
    resolutions() {
      return Resolution.find({})
        .then((response) => {
          console.log('response', response)
          return response;
        }).catch(() => {
          throw error;
        });
    }
  },
  Mutation: {
    createResolution(obj, { name }, context) {
      var ObjectID = require('mongodb').ObjectID
      const testResolution = new Resolution({ _id: new ObjectID(), name });
      testResolution.save();
    }
  }
};