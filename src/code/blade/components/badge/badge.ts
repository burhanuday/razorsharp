import {
  BladeComponentInstanceNode,
  BladeGroupNode,
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
import { isPresent } from "../../utils/isPresent";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { defaultProps } from "./constants";

export const transformBadge = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const isIconPresent = isPresent(
    bladeInstance.componentProperties.Icon?.value
  );

  // TODO figure out why this prop does not exist in Blade code
  const isAllCaps = isPresent(bladeInstance.componentProperties.allCaps?.value);

  const contrast = jsxValue(
    bladeInstance.componentProperties.contrast?.value
  ).toLowerCase();
  const intent = jsxValue(
    bladeInstance.componentProperties.intent?.value
  ).toLowerCase();
  const size = jsxValue(
    bladeInstance.componentProperties.size?.value
  ).toLowerCase();
  const text = traverseNodeTree(
    bladeInstance,
    (node) => node.layerName === "badge-text" && node.type === "TEXT"
  );
  const children = (text as BladeTextNode)?.characters;

  let icon = "";
  if (isIconPresent) {
    const iconNodeWrapper = traverseNodeTree(
      bladeInstance,
      (bladeNode) => bladeNode.layerName === "badge-icon"
    ) as BladeGroupNode;
    const iconNode = iconNodeWrapper.children[0];
    if (iconNode && isIconInstance(iconNode as BladeComponentInstanceNode)) {
      icon = convertFigmaIconNameToBladeIconName(
        (iconNode as BladeComponentInstanceNode)?.name || "unidentified-icon"
      );
    }
  }

  const props: BladeProps = {
    contrast: {
      type: "string",
      value: contrast,
    },
    variant: {
      type: "string",
      value: intent,
    },
    size: {
      type: "string",
      value: size,
    },
    icon: {
      type: "instance",
      value: icon,
    },
  };

  return {
    component: component("Badge", {
      props,
      defaultValues: defaultProps,
      children,
    }),
  };
};
