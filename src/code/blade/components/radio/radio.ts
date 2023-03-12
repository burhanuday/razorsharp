import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { defaultValues } from "./constants";
import { findTextByLayerName } from "../../utils/findTextByLayerName";
import { bladeImports } from "../../utils/imports";

export const transformRadio = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const children = findTextByLayerName(bladeInstance, "Label") ?? "";

  const isHelpTextPresent = isPresent(
    bladeInstance.componentProperties.helpText?.value
  );

  let helpText = "";
  if (isHelpTextPresent) {
    helpText = findTextByLayerName(bladeInstance, "Help Text") ?? "";
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
    imports: bladeImports(["Radio"]),
  };
};
