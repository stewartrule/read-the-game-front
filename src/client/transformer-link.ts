import { ApolloLink, FetchResult, Observable } from "apollo-link";

import { AnyObject, isPlainObject } from "../util/object";

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

function parseObject(transformers: Transformers, object: unknown): void {
  if (!object) {
    return;
  }

  if (Array.isArray(object)) {
    return object.forEach(value => parseObject(transformers, value));
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

function parseObjectValues(map: TransformerMap, object: AnyObject) {
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
