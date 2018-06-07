import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
//import individual schemas here and then add to typeDefs array below
import typeDefs from './schemas/schemas.graphql';

// Import resolvers here and add to resolvers merge below
import ResolutionsResolver from './resolvers/ResolutionsResolver';
import UsersResolver from './resolvers/UsersResolver';

//You may need to make a change here to prompt server to rebuild
//t
const resolvers = merge([ResolutionsResolver, UsersResolver]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema;
