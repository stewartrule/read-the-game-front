import { ValidKeyOf } from "./types";

type AnyObject = Record<string, any>;

export const chunk = <T>(input: T[], chunkSize = 3): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < input.length; i += chunkSize) {
    chunks.push(input.slice(i, i + chunkSize));
  }

  return chunks;
};

export const maxOf = <T extends AnyObject>(
  items: T[],
  key: ValidKeyOf<T, number>
): number =>
  items.reduce((max: number, item: T) => {
    return item[key] > max ? item[key] : max;
  }, -Infinity);

export const minOf = <T extends AnyObject>(
  items: T[],
  key: ValidKeyOf<T, number>
): number =>
  items.reduce((max: number, item: T) => {
    return item[key] < max ? item[key] : max;
  }, Infinity);
