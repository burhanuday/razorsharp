import { BladeComponentInstanceNode, BladeProps } from "~/code/types/Blade";
import { component } from "../utils/component";
import { convertFigmaIconNameToBladeIconName } from "../utils/iconUtils";

const defaultValues: BladeProps = {};

export const transformIcon = (
  bladeInstance: BladeComponentInstanceNode
): string => {
  const props: BladeProps = {};

  const bladeIconName = convertFigmaIconNameToBladeIconName(
    bladeInstance?.name || "unidentified-icon"
  );

  return component(bladeIconName, {
    props,
    defaultValues,
  });
};
