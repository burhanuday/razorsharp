import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { findNode } from "../../utils/findNode";
import { titleDefaultValues } from "./constants";

export const transformTitle = (
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

  props["contrast"] = {
    value: jsxValue(componentProperties.contrast?.value).toLowerCase(),
    type: "string",
  };

  const textNode = findNode(
    bladeInstance,
    (node) => node.layerName === "Text" && node.type === "TEXT"
  );
  const children = (textNode as BladeTextNode)?.characters;

  return {
    component: component("Title", {
      props,
      defaultValues: titleDefaultValues,
      children,
    }),
  };
};
