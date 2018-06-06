import Users from '../../database/models/users';

// These two lines added a test resolution to the database
// const testResolution = new Resolutions({ _id: '56785695', name: 'Tester' });
// testResolution.save();

export default {
  Query: {
    // This gets Users from the database
    users() {
      return Users.find({})
        .then((response) => {
          console.log('response', response)
          return response;
        }).catch(() => {
          throw error;
        });
    }
  },
  Mutation: {
    createUser() {
      console.log('GotHERE!');
      // const testResolution = new Resolutions({ _id: '4353367', name: 'Tester2' });
      // testResolution.save();
    }
  }
};