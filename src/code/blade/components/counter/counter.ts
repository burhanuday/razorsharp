import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { defaultValues } from "./constants";

export const transformCounter = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const props: BladeProps = {
    intent: {
      value: jsxValue(componentProperties.intent?.value).toLowerCase(),
      type: "string",
    },
    size: {
      value: jsxValue(componentProperties.size?.value).toLowerCase(),
      type: "string",
    },
    contrast: {
      value: jsxValue(componentProperties.contrast?.value).toLowerCase(),
      type: "string",
    },
  };

  return { component: component("Counter", { props, defaultValues }) };
};