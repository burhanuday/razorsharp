import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { transformCheckbox } from "./checkbox";
import { checkboxDefaultValues } from "./constants";

export const transformCheckboxGroup = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const labelTextNode = traverseNodeTree(
    bladeInstance,
    (node) =>
      node.layerName === "Label" &&
      node.type === "TEXT" &&
      node.parent?.layerName === "Label Holder"
  );
  const label = (labelTextNode as BladeTextNode)?.characters;

  const isHelpTextPresent = isPresent(
    bladeInstance.componentProperties.helpText?.value
  );

  let helpText = "";
  if (isHelpTextPresent) {
    const helpTextNode = traverseNodeTree(
      bladeInstance,
      (node) =>
        node.layerName === "Help Text" &&
        node.type === "TEXT" &&
        node.parent?.layerName === "Help Group"
    );
    helpText = (helpTextNode as BladeTextNode)?.characters;
  }

  const size = jsxValue(
    bladeInstance.componentProperties.size?.value
  ).toLowerCase();

  const props: BladeProps = {
    label: {
      value: label,
      type: "string",
    },
    helpText: {
      value: helpText,
      type: "string",
    },
    size: {
      type: "string",
      value: size,
    },
  };

  const childrenWrapper = traverseNodeTree(
    bladeInstance,
    (node) => node.layerName === "Checkbox Group" && node.type === "FRAME"
  ) as BladeFrameNode;

  const children = childrenWrapper.children
    .map(transformCheckbox)
    .reduce((acc, val) => acc + val.component, "");

  return {
    component: component("CheckboxGroup", {
      props,
      defaultValues: checkboxDefaultValues,
      children,
    }),
  };
};
