import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { createTransformerLink } from "apollo-client-transform";

import typeDefs from "./schema.gql";
import { transformers } from "./transformers";

const transformerLink = createTransformerLink(transformers);

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql"
});

const client = new ApolloClient({
  cache: new InMemoryCache().restore({}),
  connectToDevTools: true,
  typeDefs,
  link: transformerLink.concat(httpLink)
});

export default client;
