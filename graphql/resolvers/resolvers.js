
import Resolutions from '../../database/models/resolutions';

const res = Resolutions.find({})
  .then((response) => {
    console.log('response', response)
    return response;
  }).catch(() => {
    throw error;
  });

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
  }
};