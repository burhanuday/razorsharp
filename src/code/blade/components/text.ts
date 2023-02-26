import { BladeProps, BladeTextNode } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../utils/component";

const textDefaultValues: BladeProps = {
  variant: { value: "body", type: "string" },
  weight: { value: "regular", type: "string" },
  size: { value: "medium", type: "string" },
  type: { value: "normal", type: "string" },
};

const titleDefaultValues: BladeProps = {
  size: { value: "small", type: "string" },
  type: { value: "normal", type: "string" },
  variant: { value: "title", type: "string" },
};

const headingDefaultValues: BladeProps = {
  variant: { value: "regular", type: "string" },
  weight: { value: "bold", type: "string" },
  size: { value: "small", type: "string" },
  type: { value: "normal", type: "string" },
};

const codeDefaultValues: BladeProps = {
  size: { value: "small", type: "string" },
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

const getDefaultValues = (name: string): BladeProps => {
  return COMPONENT_TO_DEFAULT_VALUES_MAP[name];
};

export const transformText = (
  bladeTextNode: BladeTextNode
): TransformFunctionReturnType => {
  let styleName = "";

  if (typeof bladeTextNode.textStyleId === "string") {
    const style = figma.getStyleById(bladeTextNode.textStyleId);
    // "Desktop/TitleMedium"
    styleName = style?.name ?? "";
  }

  if (styleName.length === 0) {
    return {
      component: component("Text", {
        props: {},
        defaultValues: {},
        children: bladeTextNode.characters,
      }),
    };
  }

  const variant = getComponentVariant(styleName) || "";
  const weight = getWeight(styleName) || "";
  const name = getComponentName(variant);
  const defaultValues = getDefaultValues(name);
  const size = getSize(styleName);

  const props: BladeProps = {
    variant: { value: variant, type: "string" },
    weight: { value: weight, type: "string" },
    size: { value: size, type: "string" },
  };

  return {
    component: component(name, {
      props,
      defaultValues,
      children: bladeTextNode.characters,
    }),
  };
};
