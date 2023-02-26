import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../utils/component";
import { convertFigmaIconNameToBladeIconName } from "../utils/iconUtils";

const defaultValues: BladeProps = {};

export const transformIcon = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const props: BladeProps = {};

  const bladeIconName = convertFigmaIconNameToBladeIconName(
    bladeInstance?.name || "unidentified-icon"
  );

  return {
    component: component(bladeIconName, {
      props,
      defaultValues,
    }),
  };
};
