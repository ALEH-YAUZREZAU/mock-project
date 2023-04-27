import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import apolloClient from "../lib/apolloClient";
import { NetworkErrorProvider } from "../lib/providers/NetworkError";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NetworkErrorProvider>
      <SessionProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </NetworkErrorProvider>
  );
}

export default App;
