import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../../utils/component";
import { convertFigmaIconNameToBladeIconName } from "../../utils/iconUtils";
import { bladeImports } from "../../utils/imports";
import { defaultValues } from "./constants";

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
    imports: bladeImports([bladeIconName]),
  };
};
