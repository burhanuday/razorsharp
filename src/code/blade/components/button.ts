import { BladeComponentInstanceNode, BladeTextNode } from "~/code/types/Blade";
import { jsxValue } from "../utils/attributes";
import { component } from "../utils/component";
import {
  convertFigmaIconNameToBladeIconName,
  isIconInstance,
} from "../utils/iconUtils";
import { traverseNodeTree } from "../utils/traverseNodeTree";

const defaultValues: Record<string, string> = {
  variant: "primary",
  size: "medium",
  isFullWidth: "false",
  iconPosition: "left",
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
  let iconName = "";
  let iconPosition = "";

  const labelTextNode = traverseNodeTree(
    bladeComponentInstance,
    (node) => node.layerName === "Text" && node.type === "TEXT"
  );
  const children = (labelTextNode as BladeTextNode)?.characters;

  const iconLeftNode = traverseNodeTree(
    bladeComponentInstance,
    (bladeNode) => bladeNode.layerName === "Icon Left"
  );

  if (
    iconLeftNode !== null &&
    isIconInstance(iconLeftNode as BladeComponentInstanceNode)
  ) {
    iconName = convertFigmaIconNameToBladeIconName(
      (iconLeftNode as BladeComponentInstanceNode)?.name || "unidentified-icon"
    );
    iconPosition = "left";
  }

  const iconRightNode = traverseNodeTree(
    bladeComponentInstance,
    (bladeNode) => bladeNode.layerName === "Icon Right"
  );

  if (
    iconRightNode !== null &&
    isIconInstance(iconRightNode as BladeComponentInstanceNode)
  ) {
    iconName = convertFigmaIconNameToBladeIconName(
      (iconRightNode as BladeComponentInstanceNode)?.name || "unidentified-icon"
    );
    iconPosition = "right";
  }

  const props = {
    size: jsxValue(size).toLowerCase(),
    variant: transformButtonVariant(jsxValue(variant)),
    isFullWidth: jsxValue(componentProperties.isFullWidth.value),
    iconName,
    iconPosition,
  };

  return component("Button", {
    props,
    defaultValues,
    children,
  });
};
