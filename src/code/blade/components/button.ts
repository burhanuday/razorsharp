import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { jsxValue } from "../utils/attributes";
import { component } from "../utils/component";
import {
  convertFigmaIconNameToBladeIconName,
  isIconInstance,
} from "../utils/iconUtils";
import { traverseNodeTree } from "../utils/traverseNodeTree";

const defaultValues: BladeProps = {
  variant: { value: "primary", type: "string" },
  size: { value: "medium", type: "string" },
  isFullWidth: { value: "false", type: "boolean" },
  iconPosition: { value: "left", type: "string" },
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
  let icon = "";
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
    icon = convertFigmaIconNameToBladeIconName(
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
    icon = convertFigmaIconNameToBladeIconName(
      (iconRightNode as BladeComponentInstanceNode)?.name || "unidentified-icon"
    );
    iconPosition = "right";
  }

  const props: BladeProps = {
    size: { value: jsxValue(size).toLowerCase(), type: "string" },
    variant: {
      value: transformButtonVariant(jsxValue(variant)),
      type: "string",
    },
    isFullWidth: {
      value: jsxValue(componentProperties.isFullWidth.value),
      type: "boolean",
    },
    icon: {
      value: icon,
      type: "instance",
    },
    iconPosition: {
      value: iconPosition,
      type: "string",
    },
  };

  return component("Button", {
    props,
    defaultValues,
    children,
  });
};
