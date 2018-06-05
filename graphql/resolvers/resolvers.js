
import Resolutions from '../../database/models/resolutions';
import { CLIENT_RENEG_LIMIT } from 'tls';

// These two lines added a test resolution to the database
// const testResolution = new Resolutions({ _id: '56785695', name: 'Tester' });
// testResolution.save();

export default {
  Query: {
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
    createResolution() {
      console.log('GotHERE!');
      // const testResolution = new Resolutions({ _id: '4353367', name: 'Tester2' });
      // testResolution.save();
    }
  }
};