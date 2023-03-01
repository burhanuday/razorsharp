import { BladeProps } from "~/code/types/Blade";
import {
  COMPONENT_TO_DEFAULT_VALUES_MAP,
  FONT_SIZES,
  FONT_WEIGHTS,
  VARIANTS,
  VARIANT_TO_COMPONENT_MAP,
} from "./constants";

export const getSize = (styleName: string): string => {
  const size = FONT_SIZES.find((size) => styleName.includes(size));

  return size?.toLowerCase() ?? "";
};

export const getComponentVariant = (styleName: string): string => {
  const variant = VARIANTS.find((variant) => styleName.includes(variant));

  return variant?.toLowerCase() ?? "";
};

export const getComponentName = (variant: string): string => {
  if (!variant) {
    return "Text";
  }

  return VARIANT_TO_COMPONENT_MAP[variant];
};

export const getWeight = (styleName: string): string => {
  const weight = FONT_WEIGHTS.find((weight) => styleName.includes(weight));

  return weight?.toLowerCase() ?? "";
};

export const getDefaultValues = (name: string): BladeProps => {
  return COMPONENT_TO_DEFAULT_VALUES_MAP[name];
};
