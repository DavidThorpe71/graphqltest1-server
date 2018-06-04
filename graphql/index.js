import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types/types';
import resolvers from './resolvers/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema;