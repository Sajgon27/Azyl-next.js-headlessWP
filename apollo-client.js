import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://apiazyl.smdweb.pl/graphql",
  cache: new InMemoryCache(),
});

export default client;