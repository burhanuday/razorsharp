import {
  BladeFrameNode,
  BladeGroupNode,
  BladeNode,
  BladeProps,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../../utils/component";
import { defaultValues } from "./constants";

export const transformFrameOrGroup = (
  bladeFrame: BladeFrameNode | BladeGroupNode,
  convertChildrenToCode: ({
    bladeNodes,
  }: {
    bladeNodes: BladeNode[];
  }) => TransformFunctionReturnType
): TransformFunctionReturnType => {
  const props: BladeProps = {};

  if (bladeFrame.type === "GROUP") {
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
  }

  if (
    bladeFrame.layoutMode === "VERTICAL" ||
    bladeFrame.layoutMode === "HORIZONTAL"
  ) {
    props["display"] = {
      value: "flex",
      type: "string",
    };

    props["flexDirection"] = {
      value: bladeFrame.layoutMode === "VERTICAL" ? "column" : "row",
      type: "string",
    };

    props["gap"] = {
      value: `${bladeFrame.itemSpacing}`,
      type: "number",
    };
  }

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
