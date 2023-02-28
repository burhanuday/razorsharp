import {
  BladeFrameNode,
  BladeGroupNode,
  BladeNode,
  BladeProps,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../../utils/component";
import { defaultValues, LAYOUT_MODES } from "./constants";
import { getFlexAlignmentFromAxisAlignment } from "./utils";

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
    bladeFrame.layoutMode === LAYOUT_MODES.VERTICAL ||
    bladeFrame.layoutMode === LAYOUT_MODES.HORIZONTAL
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

    let justifyContent = "";
    let alignItems = "";

    if (bladeFrame.layoutMode === LAYOUT_MODES.HORIZONTAL) {
      justifyContent = getFlexAlignmentFromAxisAlignment(
        bladeFrame.primaryAxisAlignItems
      );
      alignItems = getFlexAlignmentFromAxisAlignment(
        bladeFrame.counterAxisAlignItems
      );
    }

    if (bladeFrame.layoutMode === LAYOUT_MODES.VERTICAL) {
      justifyContent = getFlexAlignmentFromAxisAlignment(
        bladeFrame.counterAxisAlignItems
      );
      alignItems = getFlexAlignmentFromAxisAlignment(
        bladeFrame.primaryAxisAlignItems
      );
    }

    props["justifyContent"] = { value: justifyContent, type: "string" };
    props["alignItems"] = { value: alignItems, type: "string" };
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
