import User from '../../database/models/User';
import passport from 'passport';

// These two lines added a test resolution to the database
// const testResolution = new Resolutions({ _id: '56785695', name: 'Tester' });
// testResolution.save();

export default {
  Query: {
    // This gets Users from the database
    users() {
      return User.find({})
        .then((response) => {
          console.log('response', response)
          return response;
        }).catch(() => {
          throw error;
        });
    }
  },
  Mutation: {
    createUser: async (obj, { name, password, email }, context) => {
      const user = new User({ email, name })
      await User.register(user, password);
      passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Failed Login!',
        successRedirect: '/',
        successFlash: 'You are now logged in!'
      })
      return user;
    },
    login: async (obj, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user with that email address');
      }
      passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Failed login !',
        successRedirect: '/',
        successFlash: 'You are now logged in'
      })
    },
    logout: (obj, args, context) => {
      context.req.logout();
      console.log('success')
    }

  }
};