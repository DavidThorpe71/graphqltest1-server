import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
//import individual schemas here and then add to typeDefs array below
// import UserSchema from '../api/firsttest.graphql';
import ResolutionsSchema from '../api/resolutions.graphql';
import ResolutionsResolvers from './resolvers/resolvers';

const testSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
}
`;

const typeDefs = [testSchema, ResolutionsSchema];

const testResolvers = {
  Query: {
    hi() {
      return "Hello WORLD!!!!"
    }
  }
};

const resolvers = merge(testResolvers, ResolutionsResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema;
