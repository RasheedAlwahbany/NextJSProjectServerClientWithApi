// /pages/api/graphql.js
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { typeDefs, resolvers } from '../../../graphql/schema';

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }), // Ensure prisma is correctly passed in context
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
