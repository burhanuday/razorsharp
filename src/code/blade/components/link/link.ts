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
import { getLinkIconProps } from "./utils";

export const transformLink = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const size = jsxValue(
    bladeInstance.componentProperties.size.value
  ).toLowerCase();

  const { icon, iconPosition } = getLinkIconProps(bladeInstance);

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
