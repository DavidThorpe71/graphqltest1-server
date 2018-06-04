import { makeExecutableSchema } from 'graphql-tools';

//import individual schemas here and then add to typeDefs array below
import UserSchema from '../api/firsttest.graphql';

const testSchema = `
type Query {
  hi: String
  users: [User]
}
`;

const typeDefs = [testSchema, UserSchema];

const resolvers = {
  Query: {
    hi() {
      return "Hello WORLDLSL!"
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema;
