//Import Model from database
import Resolutions from '../../database/models/resolutions';

// These two lines added a test resolution to the database
// const testResolution = new Resolutions({ _id: '56785695', name: 'Tester' });
// testResolution.save();

export default {
  Query: {
    // This gets resolutions from the database
    resolutions() {
      return Resolutions.find({})
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
      const testResolution = new Resolutions({ _id: new ObjectID(), name });
      testResolution.save();
    }
  }
};