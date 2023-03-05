import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { findTextByLayerName } from "../../utils/findTextByLayerName";
import { defaultValues } from "./constants";

export const transformIndicator = (
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
  };

  const children = findTextByLayerName(bladeComponentInstance, "Label") ?? "";

  return {
    component: component("Indicator", { props, defaultValues, children }),
  };
};
