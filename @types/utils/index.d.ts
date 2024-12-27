type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition
    ? K
    : never;
}[keyof T];

type TParams = {
  [key: string]: any;
};