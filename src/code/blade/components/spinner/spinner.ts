import {
  BladeComponentInstanceNode,
  BladeGroupNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { defaultValues } from "./constants";

export const transformSpinner = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const props: BladeProps = {};

  const componentProperties = bladeInstance.componentProperties;

  props["size"] = {
    value: jsxValue(componentProperties.size?.value).toLowerCase(),
    type: "string",
  };

  props["contrast"] = {
    value: jsxValue(componentProperties.contrast?.value).toLowerCase(),
    type: "string",
  };

  const isLabelPresent = isPresent(componentProperties.label?.value);
  if (isLabelPresent) {
    const labelTextNode = traverseNodeTree(
      bladeInstance,
      (node) => node.type === "TEXT" && node.layerName === "Label"
    );
    props["label"] = {
      value: (labelTextNode as BladeTextNode)?.characters,
      type: "string",
    };

    props["labelPosition"] = {
      value: props.size.value === "medium" ? "right" : "bottom",
      type: "string",
    };
  }

  return {
    component: component("Spinner", {
      props,
      defaultValues,
    }),
  };
};
