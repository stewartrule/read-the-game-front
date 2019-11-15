export function getPrototypeOf(obj: unknown) {
  return Object.getPrototypeOf(obj);
}

export function isPlainObject(obj: unknown) {
  if (typeof obj !== "object" || obj === null) return false;

  const proto = getPrototypeOf(obj);
  if (proto === null) return true;

  let baseProto = proto;
  while (getPrototypeOf(baseProto) !== null) {
    baseProto = getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}
