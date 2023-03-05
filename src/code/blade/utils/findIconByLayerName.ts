import { BladeComponentInstanceNode, BladeNode } from "~/code/types/Blade";
import { findNode } from "./findNode";
import {
  convertFigmaIconNameToBladeIconName,
  isIconInstance,
} from "./iconUtils";

const isBladeComponentInstanceNode = (
  node: BladeNode | null
): node is BladeComponentInstanceNode => {
  if (node === null) return false;
  return node.type === "INSTANCE";
};

export const findIconByLayerName = (
  bladeNode: BladeNode,
  layerName: string
): string | null => {
  let validateNode: (node: BladeNode) => boolean;

  validateNode = (node) =>
    node.layerName === layerName && node.type === "INSTANCE";

  const iconNode = findNode(bladeNode, validateNode);
  if (isBladeComponentInstanceNode(iconNode) && isIconInstance(iconNode)) {
    return convertFigmaIconNameToBladeIconName(
      iconNode.name || "unidentified-icon"
    );
  }

  return null;
};
