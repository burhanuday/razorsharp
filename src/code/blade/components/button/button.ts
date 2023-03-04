import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import {
  convertFigmaIconNameToBladeIconName,
  isIconInstance,
} from "../../utils/iconUtils";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { defaultValues } from "./constants";
import { transformButtonVariant } from "./utils";

export const transformButton = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const size = componentProperties.size?.value;
  const variant = componentProperties.variant?.value;
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
      value: jsxValue(componentProperties.isFullWidth?.value),
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

  return {
    component: component("Button", {
      props,
      defaultValues,
      children,
    }),
  };
};
