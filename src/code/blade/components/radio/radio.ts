import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { defaultValues } from "./constants";

export const transformRadio = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const labelTextNode = traverseNodeTree(
    bladeInstance,
    (node) => node.layerName === "Label" && node.type === "TEXT"
  );
  const children = (labelTextNode as BladeTextNode)?.characters;

  const isHelpTextPresent = isPresent(
    bladeInstance.componentProperties.helpText?.value
  );

  let helpText = "";
  if (isHelpTextPresent) {
    const helpTextNode = traverseNodeTree(
      bladeInstance,
      (node) => node.layerName === "Help Text" && node.type === "TEXT"
    );
    helpText = (helpTextNode as BladeTextNode)?.characters;
  }

  const size = jsxValue(
    bladeInstance.componentProperties.size?.value
  ).toLowerCase();

  const props: BladeProps = {
    size: {
      type: "string",
      value: size,
    },
    helpText: {
      value: helpText,
      type: "string",
    },
  };
  return {
    component: component("Radio", {
      props,
      defaultValues: defaultValues,
      children,
    }),
  };
};
