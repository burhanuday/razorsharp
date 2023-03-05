import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import {
  convertFigmaIconNameToBladeIconName,
  isIconInstance,
} from "../../utils/iconUtils";
import { findNode } from "../../utils/findNode";
import { defaultValues } from "./constants";
import { transformButtonVariant } from "./utils";
import { findTextByLayerName } from "../../utils/findTextByLayerName";

export const transformButton = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const size = componentProperties.size?.value;
  const variant = componentProperties.variant?.value;
  let icon = "";
  let iconPosition = "";

  const children = findTextByLayerName(bladeComponentInstance, "Text") ?? "";

  const iconLeftNode = findNode(
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

  const iconRightNode = findNode(
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
