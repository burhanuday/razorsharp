import { BladeFrameNode, BladeNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../utils/component";

const HAS_BOX_BEEN_RELEASED = false;

const defaultValues: BladeProps = {
  flexDirection: { value: "row", type: "string" },
  display: { value: "block", type: "string" },
  gap: { value: "0", type: "string" },
};

export const transformFrame = (
  bladeFrame: BladeFrameNode,
  convertChildrenToCode: ({
    bladeNodes,
  }: {
    bladeNodes: BladeNode[];
  }) => TransformFunctionReturnType
): TransformFunctionReturnType => {
  console.log("🚀 ~ file: box.ts:15 ~ bladeFrame:", bladeFrame);

  const props: BladeProps = {};

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

  if (!HAS_BOX_BEEN_RELEASED) {
    return {
      component: component("div", {
        props: {},
        defaultValues: {},
        children,
      }),
    };
  }

  return {
    component: component("Box", {
      props,
      defaultValues,
      children,
    }),
  };
};
