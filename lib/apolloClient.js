// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
//   uri:process.env.NEXT_PUBLIC_GRAPHQL_API_URL, // URL of your GraphQL server
  uri:'/api/graphql', // URL of your GraphQL server
  cache: new InMemoryCache(),
});

export default client;
