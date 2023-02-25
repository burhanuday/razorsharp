import { BladeProps, JSXValue } from "~/code/types/Blade";
import { indent } from "./indent";
import { newLine } from "./newLine";

export const jsxValue = (value: string | boolean): string => {
  if (value === "True" || value === true) return "true";
  if (value === "False" || value === false) return "false";

  return value;
};

export const jsxAttribute = (key: string, value: JSXValue): string => {
  if (typeof value === "boolean") {
    return value ? `${key}={true}` : `${key}={false}`;
  }

  if (value === "true" || value === "false" || typeof value === "number") {
    return `${key}={${value}}`;
  }
  return `${key}="${value}"`;
};

export const attributes = (props: BladeProps): string => {
  return Object.entries(props)
    .filter(([, value]) => !!value)
    .map(([key, value]) => jsxAttribute(key, value))
    .map((item) => newLine(indent(item)))
    .join("");
};
