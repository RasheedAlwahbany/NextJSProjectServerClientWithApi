// pages/_app.js
import { ApolloProvider } from '@apollo/client';
import client from '../../lib/apolloClient';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
