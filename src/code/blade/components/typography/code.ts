import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { findTextByLayerName } from "../../utils/findTextByLayerName";
import { codeDefaultValues } from "./constants";

export const transformCode = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const props: BladeProps = {};

  const componentProperties = bladeInstance.componentProperties;

  props["size"] = {
    value: jsxValue(componentProperties.variant?.value).toLowerCase(),
    type: "string",
  };

  const children = findTextByLayerName(bladeInstance, "Text") ?? "";

  return {
    component: component("Code", {
      props,
      defaultValues: codeDefaultValues,
      children,
    }),
  };
};
