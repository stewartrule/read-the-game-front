import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";

import { createTransformerLink, isSubscription } from "./client-transformer";
import typeDefs from "./schema.gql";
import { transformers } from "./transformers";

const host = "localhost";

const httpLink = createHttpLink({
  uri: `http://${host}:3000/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://${host}:3000/graphql`,
  options: {
    reconnect: true,
    lazy: true
  }
});

const transformerLink = createTransformerLink(transformers);

const link = split(({ query }) => isSubscription(query), wsLink, httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache().restore({}),
  connectToDevTools: true,
  typeDefs,
  link: transformerLink.concat(link)
});

export default client;
