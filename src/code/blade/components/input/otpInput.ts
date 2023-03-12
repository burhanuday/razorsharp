import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { defaultValues } from "./constants";
import { findTextByLayerName } from "../../utils/findTextByLayerName";
import { bladeImports } from "../../utils/imports";

export const transformOtpInput = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const isHelpTextPresent = isPresent(componentProperties.helperText?.value);

  const props: BladeProps = {
    labelPosition: {
      value: jsxValue(componentProperties.labelPosition?.value).toLowerCase(),
      type: "string",
    },
    otpLength: {
      value: jsxValue(componentProperties.numberOfFields?.value).toLowerCase(),
      type: "number",
    },
  };

  props["label"] = {
    value: findTextByLayerName(bladeComponentInstance, "Label") ?? "",
    type: "string",
  };

  if (isHelpTextPresent) {
    props["helpText"] = {
      value: findTextByLayerName(bladeComponentInstance, "Help Text") ?? "",
      type: "string",
    };
  }

  return {
    component: component("OTPInput", { props, defaultValues }),
    imports: bladeImports(["OTPInput"]),
  };
};
