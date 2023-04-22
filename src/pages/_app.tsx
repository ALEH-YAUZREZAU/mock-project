import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
