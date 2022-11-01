import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { DocumentNode } from "graphql";

import typeDefs from "./schema.gql";
import { createTransformerLink } from "./transformer-link";
import { transformers } from "./transformers";

const host = "localhost";
const port = 3000;

const httpLink = createHttpLink({
  uri: `http://${host}:${port}/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://${host}:${port}/graphql`,
  options: {
    reconnect: true,
    lazy: true
  }
});

const transformerLink = createTransformerLink(transformers);

export function isSubscription(query: DocumentNode) {
  const definition = getMainDefinition(query);

  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
}

const link = split(({ query }) => isSubscription(query), wsLink, httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache({}).restore({}),
  connectToDevTools: true,
  typeDefs,
  link: transformerLink.concat(link)
});

export default client;
