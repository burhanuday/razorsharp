import { BladeFrameNode, BladeNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../utils/component";

const defaultValues: BladeProps = {};

export const transformFrame = (
  bladeFrame: BladeFrameNode,
  convertChildrenToCode: ({
    bladeNodes,
  }: {
    bladeNodes: BladeNode[];
  }) => TransformFunctionReturnType
): TransformFunctionReturnType => {
  const props: BladeProps = {};

  let children = "";
  if (bladeFrame.children && bladeFrame.children.length > 0) {
    children = convertChildrenToCode({
      bladeNodes: bladeFrame.children,
    }).component;
  }

  return {
    component: component("Box", {
      props,
      defaultValues,
      children,
    }),
  };
};
