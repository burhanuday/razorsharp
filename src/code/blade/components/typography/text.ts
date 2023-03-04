import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { textDefaultValues } from "./constants";

export const transformText = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const props: BladeProps = {};

  const componentProperties = bladeInstance.componentProperties;

  props["size"] = {
    value: jsxValue(componentProperties.size?.value).toLowerCase(),
    type: "string",
  };

  props["type"] = {
    value: jsxValue(componentProperties.type?.value).toLowerCase(),
    type: "string",
  };

  props["weight"] = {
    value: jsxValue(componentProperties.weight?.value).toLowerCase(),
    type: "string",
  };

  props["contrast"] = {
    value: jsxValue(componentProperties.contrast?.value).toLowerCase(),
    type: "string",
  };

  props["variant"] = {
    value: jsxValue(componentProperties.variant?.value).toLowerCase(),
    type: "string",
  };

  const textNode = traverseNodeTree(
    bladeInstance,
    (node) => node.layerName === "Text" && node.type === "TEXT"
  );
  const children = (textNode as BladeTextNode)?.characters;

  return {
    component: component("Text", {
      props,
      defaultValues: textDefaultValues,
      children,
    }),
  };
};
