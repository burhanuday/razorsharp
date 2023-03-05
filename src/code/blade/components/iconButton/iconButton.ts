import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { findIconByLayerName } from "../../utils/findIconByLayerName";
import { defaultValues } from "./constants";

export const transformIconButton = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const props: BladeProps = {
    icon: {
      value:
        findIconByLayerName(bladeComponentInstance, "Icon (change here)") ?? "",
      type: "instance",
    },
    // TODO figure out why figma sizes are in pixel and
    // not props like "medium", "small"
    size: {
      value: jsxValue(componentProperties.size?.value).toLowerCase(),
      type: "string",
    },
    contrast: {
      value: jsxValue(componentProperties.contrast?.value).toLowerCase(),
      type: "string",
    },
  };

  return { component: component("IconButton", { props, defaultValues }) };
};
