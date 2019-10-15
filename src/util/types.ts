export type Tuple<T, L extends number> = [T, ...T[]] & { length: L };

export type Maybe<T> = T | undefined
