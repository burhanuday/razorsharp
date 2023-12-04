export const getItemAsync = async (key: string): Promise<unknown> => {
  return figma.clientStorage.getAsync(key);
};

export const setItemAsync = async (
  key: string,
  value: unknown
): Promise<void> => {
  return figma.clientStorage.setAsync(key, value);
};
