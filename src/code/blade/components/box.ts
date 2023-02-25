import { BladeFrameNode } from "~/code/types/Blade";
import { generateBladeCode } from "../main";
import { component } from "../utils/component";

const defaultValues: Record<string, string> = {};

export const transformFrame = (bladeFrame: BladeFrameNode): string => {
  const props = {};

  let children = "";
  if (bladeFrame.children && bladeFrame.children.length > 0) {
    children = generateBladeCode({ bladeNodes: bladeFrame.children });
  }

  return component("div", {
    props,
    defaultValues,
    children,
  });
};
