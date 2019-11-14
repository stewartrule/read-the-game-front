export type Tuple<T, L extends number> = [T, ...T[]] & { length: L };

export type Maybe<T> = T | undefined

export type ValueOf<T> = T[keyof T];

export type ValidKeyOf<T, ValidKeyType> = ValueOf<
  {
    [K in keyof T]: T[K] extends ValidKeyType ? K : never;
  }
>;
