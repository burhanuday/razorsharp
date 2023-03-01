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

export const transformLink = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const size = jsxValue(
    bladeInstance.componentProperties.size.value
  ).toLowerCase();

  let icon = "";
  let iconPosition = "";

  let iconLeftNode = traverseNodeTree(
    bladeInstance,
    (bladeNode) => bladeNode.layerName === "Icon Left"
  );

  if (iconLeftNode !== null) {
    iconLeftNode = traverseNodeTree(
      iconLeftNode,
      (bladeNode) => bladeNode.layerName === "Icon (change here)"
    );
    if (isIconInstance(iconLeftNode as BladeComponentInstanceNode)) {
      icon = convertFigmaIconNameToBladeIconName(
        (iconLeftNode as BladeComponentInstanceNode)?.name ||
          "unidentified-icon"
      );
      iconPosition = "left";
    }
  }

  let iconRightNode = traverseNodeTree(
    bladeInstance,
    (bladeNode) => bladeNode.layerName === "Icon Right"
  );

  if (iconRightNode !== null) {
    iconRightNode = traverseNodeTree(
      iconRightNode,
      (bladeNode) => bladeNode.layerName === "Icon (change here)"
    );
    if (isIconInstance(iconRightNode as BladeComponentInstanceNode)) {
      icon = convertFigmaIconNameToBladeIconName(
        (iconRightNode as BladeComponentInstanceNode)?.name ||
          "unidentified-icon"
      );
      iconPosition = "right";
    }
  }

  const text = traverseNodeTree(
    bladeInstance,
    (node) => node.layerName === "Text" && node.type === "TEXT"
  );
  const children = (text as BladeTextNode)?.characters;

  const props: BladeProps = {
    size: {
      type: "string",
      value: size,
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
    component: component("Link", {
      props,
      defaultValues,
      children,
    }),
  };
};
