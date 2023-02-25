import { BladeComponentInstanceNode, BladeTextNode } from "~/code/types/Blade";
import { jsxValue } from "../utils/attributes";
import { component } from "../utils/component";
import { traverseNodeTree } from "../utils/traverseNodeTree";

const defaultValues: Record<string, string> = {
  variant: "primary",
  size: "medium",
  isFullWidth: "false",
};

const transformButtonVariant = (variant: string): string => {
  return variant.toLowerCase().split(" ")[0];
};

export const transformButton = (
  bladeComponentInstance: BladeComponentInstanceNode
): string => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const size = componentProperties.size.value;
  const variant = componentProperties.variant.value;

  const props = {
    size: jsxValue(size).toLowerCase(),
    variant: transformButtonVariant(jsxValue(variant)),
    isFullWidth: jsxValue(componentProperties.isFullWidth.value),
  };

  const labelTextNode = traverseNodeTree(
    bladeComponentInstance,
    (node) => node.layerName === "Text" && node.type === "TEXT"
  );
  const children = (labelTextNode as BladeTextNode)?.characters;

  return component("Button", {
    props,
    defaultValues,
    children,
  });
};
