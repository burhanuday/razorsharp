import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { findTextByLayerName } from "../../utils/findTextByLayerName";
import { defaultValues } from "./constants";
import { getLinkIconProps } from "./utils";

export const transformLink = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const size = jsxValue(
    bladeInstance.componentProperties.size?.value
  ).toLowerCase();

  const { icon, iconPosition } = getLinkIconProps(bladeInstance);

  const children = findTextByLayerName(bladeInstance, "Text") ?? "";

  const props: BladeProps = {
    size: {
      type: "string",
      value: size,
    },
    icon: {
      value: icon,
      type: "instance",
    },
    iconPosition: {
      value: iconPosition,
      type: "string",
    },
  };

  return {
    component: component("Link", {
      props,
      defaultValues,
      children,
    }),
  };
};
