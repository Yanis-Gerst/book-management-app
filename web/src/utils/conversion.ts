type Rename<T, K extends keyof T, N extends string> = Pick<
  T,
  Exclude<keyof T, K>
> & { [P in N]: T[K] };

const renameKey = <T>(obj: T, oldKey: keyof T, newKey: string) => {
  const newObject: Record<string, any> = {};
  delete Object.assign(newObject, obj, { [newKey]: obj[oldKey] })[oldKey];
  return newObject;
};

export const renamesKeys = (
  obj: Record<string, any>[],
  oldKey: string,
  newKey: string
) => {
  return obj.map((o) => renameKey(o, oldKey, newKey));
};
