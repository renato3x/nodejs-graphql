const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchema } = require('@graphql-tools/load');
const { ApolloServer } = require('apollo-server');
const { createYoga, createSchema } = require('graphql-yoga');
const { createServer } = require('http');
const resolvers = require('./resolvers');

async function main() {
  const typeDefs = await loadSchema('./schema/*.graphql', {
    loaders: [new GraphQLFileLoader]
  });

  const schema = createSchema({ typeDefs, resolvers });
  const yoga = createYoga({ schema });

  // const server = new ApolloServer({ typeDefs, resolvers });
  const server = createServer(yoga);
  
  // server.listen(3000).then(() => {
  //   console.log('Server open in http://localhost:3000/');
  // });

  server.listen(3000).on('listening', () => {
    console.log('Server open in http://localhost:3000/');
  });
}

main();
