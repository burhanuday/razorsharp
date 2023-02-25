export const isPresent = (value: string | boolean) => {
  if (typeof value === "string") {
    return value === "True";
  }

  return value;
};
