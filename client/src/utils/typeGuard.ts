export const typeGuard = <T>(target: any, key: string): target is T => {
  return key in target;
};
