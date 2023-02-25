import { BladeFrameNode, BladeNode } from "~/code/types/Blade";
import { component } from "../utils/component";

const defaultValues: Record<string, string> = {};

export const transformFrame = (
  bladeFrame: BladeFrameNode,
  convertChildrenToCode: ({ bladeNodes }: { bladeNodes: BladeNode[] }) => string
): string => {
  const props = {};

  let children = "";
  if (bladeFrame.children && bladeFrame.children.length > 0) {
    children = convertChildrenToCode({ bladeNodes: bladeFrame.children });
  }

  return component("Box", {
    props,
    defaultValues,
    children,
  });
};
