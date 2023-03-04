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

export const transformOtpInput = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const isHelpTextPresent = isPresent(componentProperties.helperText.value);

  const props: BladeProps = {
    labelPosition: {
      value: jsxValue(componentProperties.labelPosition.value).toLowerCase(),
      type: "string",
    },
    otpLength: {
      value: jsxValue(componentProperties.numberOfFields.value).toLowerCase(),
      type: "number",
    },
  };

  const labelTextNode = traverseNodeTree(
    bladeComponentInstance,
    (node) => node.layerName === "Label" && node.type === "TEXT"
  );
  props["label"] = {
    value: (labelTextNode as BladeTextNode)?.characters,
    type: "string",
  };

  if (isHelpTextPresent) {
    const helpTextNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Help Text" && node.type === "TEXT"
    );
    props["helpText"] = {
      value: (helpTextNode as BladeTextNode)?.characters,
      type: "string",
    };
  }

  return { component: component("OTPInput", { props, defaultValues }) };
};
