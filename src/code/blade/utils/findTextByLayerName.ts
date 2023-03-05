import { BladeNode, BladeTextNode } from "~/code/types/Blade";
import { findNode } from "./findNode";

const isBladeTextNode = (node: BladeNode | null): node is BladeTextNode => {
  if (node === null) return false;
  return node.type === "TEXT";
};

export const findTextByLayerName = (
  bladeNode: BladeNode,
  layerName: string
): string | null => {
  let validateNode: (node: BladeNode) => boolean;

  validateNode = (node) => node.layerName === layerName && node.type === "TEXT";

  const textNode = findNode(bladeNode, validateNode);
  return isBladeTextNode(textNode) ? textNode.characters.trim() : null;
};
