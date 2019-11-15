import { ApolloLink, FetchResult, Observable } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { DocumentNode } from "graphql";
import { isPlainObject } from "../util/object";

type Transformer = {
  parseValue: (value: any) => any;
  serialize: (value: any) => any;
};

type TransformerMap = {
  [index: string]: Transformer;
};

type Transformers = {
  [typename: string]: TransformerMap;
};

function parseObject(transformers: Transformers, object: any): void {
  if (!object) {
    return;
  }

  if (Array.isArray(object)) {
    return object.forEach(i => parseObject(transformers, i));
  }

  if (!isPlainObject(object)) {
    return;
  }

  for (let key in object) {
    parseObject(transformers, object[key]);
  }

  const typename = object.__typename;

  if (typename && transformers[typename]) {
    parseObjectValues(transformers[typename], object);
  }
}

function parseObjectValues(map: TransformerMap, object: any) {
  for (let key in map) {
    if (object[key]) {
      object[key] = map[key].parseValue(object[key]);
    }
  }
}

function parseResponse(response: FetchResult, transformers: Transformers) {
  if (response.data) {
    parseObject(transformers, response.data);
  }

  return response;
}

export function isSubscription(query: DocumentNode) {
  const definition = getMainDefinition(query);

  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
}

export function createTransformerLink(transformers: Transformers) {
  return new ApolloLink(
    (operation, forward) =>
      new Observable<FetchResult>(observer =>
        forward(operation).subscribe(response =>
          observer.next(parseResponse(response, transformers))
        )
      )
  );
}
