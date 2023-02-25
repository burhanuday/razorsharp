import { BladeComponentInstanceNode } from "~/code/types/Blade";
import { component } from "../utils/component";
import { convertFigmaIconNameToBladeIconName } from "../utils/iconUtils";

const defaultValues: Record<string, string> = {};

export const transformIcon = (
  bladeInstance: BladeComponentInstanceNode
): string => {
  const props = {};

  const bladeIconName = convertFigmaIconNameToBladeIconName(
    bladeInstance?.name || "unidentified-icon"
  );

  return component(bladeIconName, {
    props,
    defaultValues,
  });
};
