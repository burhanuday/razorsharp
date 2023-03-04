export const isPresent = (value: string | boolean | undefined) => {
  if (typeof value === "undefined") {
    return false;
  }
  if (typeof value === "string") {
    return value === "True";
  }

  return value;
};
