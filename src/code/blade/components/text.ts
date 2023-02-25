import { BladeTextNode } from "~/code/types/Blade";
import { component } from "../utils/component";

const textDefaultValues: Record<string, string> = {
  variant: "body",
  weight: "regular",
  size: "medium",
  type: "normal",
};

const titleDefaultValues: Record<string, string> = {
  size: "small",
  type: "normal",
};

const headingDefaultValues: Record<string, string> = {
  variant: "regular",
  weight: "bold",
  size: "small",
  type: "normal",
};

const codeDefaultValues: Record<string, string> = {
  size: "small",
};

const VARIANTS = [
  "Heading",
  "Body",
  "Caption",
  "Subheading",
  "Title",
  "Code",
] as const;

const VARIANT_TO_COMPONENT_MAP = {
  heading: "Heading",
  subheading: "Heading",
  body: "Text",
  caption: "Text",
  title: "Title",
  code: "Code",
} as const;

const COMPONENT_TO_DEFAULT_VALUES_MAP = {
  Heading: headingDefaultValues,
  Text: textDefaultValues,
  Title: titleDefaultValues,
  Code: codeDefaultValues,
};

const FONT_WEIGHTS = ["Regular", "Bold"] as const;

const FONT_SIZES = ["Small", "Medium", "Large"] as const;

const getSize = (styleName: string): string => {
  const size = FONT_SIZES.find((size) => styleName.includes(size));

  return size?.toLocaleLowerCase() ?? "";
};

const getComponentVariant = (styleName: string): string => {
  const variant = VARIANTS.find((variant) => styleName.includes(variant));

  return variant?.toLocaleLowerCase() ?? "";
};

const getComponentName = (variant: string): string => {
  if (!variant) {
    return "Text";
  }

  return VARIANT_TO_COMPONENT_MAP[variant];
};

const getWeight = (styleName: string): string => {
  const weight = FONT_WEIGHTS.find((weight) => styleName.includes(weight));

  return weight?.toLocaleLowerCase() ?? "";
};

const getDefaultValues = (name: string): Record<string, string> => {
  return COMPONENT_TO_DEFAULT_VALUES_MAP[name];
};

export const transformText = (bladeTextNode: BladeTextNode): string => {
  let styleName = "";

  if (typeof bladeTextNode.textStyleId === "string") {
    const style = figma.getStyleById(bladeTextNode.textStyleId);
    // "Desktop/TitleMedium"
    styleName = style?.name ?? "";
  }

  if (styleName.length === 0) {
    return component("Text", {
      props: {},
      defaultValues: {},
      children: bladeTextNode.characters,
    });
  }

  const variant = getComponentVariant(styleName) || "";
  const weight = getWeight(styleName) || "";
  const name = getComponentName(variant);
  const defaultValues = getDefaultValues(name);
  const size = getSize(styleName);

  const props = {
    variant,
    weight,
    size,
  };

  console.log(props, name, defaultValues);

  return component(name, {
    props,
    defaultValues,
    children: bladeTextNode.characters,
  });
};
