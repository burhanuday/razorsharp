import { BladeFrameNode, BladeGroupNode, BladeProps } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { generateBladeCode } from "../../main";
import { component } from "../../utils/component";
import { bladeImports, mergeImports } from "../../utils/imports";
import { defaultValues, LAYOUT_MODES } from "./constants";
import {
  getFlexAlignmentFromAxisAlignment,
  getPaddingValue,
  getTokenFromSpacingValue,
} from "./utils";

export const transformFrameOrGroup = (
  bladeFrame: BladeFrameNode | BladeGroupNode
): TransformFunctionReturnType => {
  console.log("🚀 ~ file: box.ts:16 ~ bladeFrame:", bladeFrame);
  const props: BladeProps = {};

  // TODO groups can have item spacing as well
  // since item spacing figma property does not exist
  // for groups, use relative transform matrix to find the
  // distances between elements in a group
  if (bladeFrame.type === "GROUP") {
    let children: TransformFunctionReturnType = { component: "", imports: {} };
    if (bladeFrame.children && bladeFrame.children.length > 0) {
      children = generateBladeCode({
        bladeNodes: bladeFrame.children,
      });
    }

    return {
      component: component("Box", {
        props,
        defaultValues,
        children: children.component,
      }),
      imports: mergeImports(children.imports ?? {}, bladeImports(["Box"])),
    };
  }

  // --- Frame specific code below ---
  // --- Layout mode specific code below ---
  // TODO set alignItems and justifyContent when items don't fill the entire space
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
      value: getTokenFromSpacingValue(bladeFrame.itemSpacing),
      type: "string",
    };

    const justifyContent = getFlexAlignmentFromAxisAlignment(
      bladeFrame.layoutMode === LAYOUT_MODES.HORIZONTAL
        ? bladeFrame.primaryAxisAlignItems
        : bladeFrame.counterAxisAlignItems
    );
    const alignItems = getFlexAlignmentFromAxisAlignment(
      bladeFrame.layoutMode === LAYOUT_MODES.HORIZONTAL
        ? bladeFrame.counterAxisAlignItems
        : bladeFrame.primaryAxisAlignItems
    );

    props["justifyContent"] = { value: justifyContent, type: "string" };
    props["alignItems"] = { value: alignItems, type: "string" };

    const paddingValue = getPaddingValue({
      top: bladeFrame.paddingTop,
      right: bladeFrame.paddingRight,
      bottom: bladeFrame.paddingBottom,
      left: bladeFrame.paddingLeft,
    });
    // always generate an array. easier to generate this syntax
    // since it works in all cases
    props["padding"] = {
      value:
        paddingValue.length > 1
          ? `[${paddingValue.map((value) => `"${value}"`).join(", ")}]`
          : paddingValue[0],
      type: paddingValue.length > 1 ? "instance" : "string",
    };

    if (bladeFrame.primaryAxisSizingMode === "FIXED") {
      const isFixedHeight = bladeFrame.layoutMode === "VERTICAL";
      props[isFixedHeight ? "height" : "width"] = {
        value: `${isFixedHeight ? bladeFrame.height : bladeFrame.width}px`,
        type: "string",
      };
    }

    if (bladeFrame.counterAxisSizingMode === "FIXED") {
      const isFixedHeight = bladeFrame.layoutMode === "HORIZONTAL";
      props[isFixedHeight ? "height" : "width"] = {
        value: `${isFixedHeight ? bladeFrame.height : bladeFrame.width}px`,
        type: "string",
      };
    }
  }
  // --- Layout mode specific end ---

  // TODO add support for fills array
  // TODO handle figma.mixed
  // --- Background color ---
  if (bladeFrame.fillStyleId !== figma.mixed) {
    const fillStyle = figma.getStyleById(bladeFrame.fillStyleId);
    if (fillStyle) {
      const styleName = fillStyle.name;
      const bladeTokenName = styleName
        .split("/")
        .map((tokenPart) => tokenPart.toLowerCase())
        .join(".");

      // background color is for box component can only start with surface.background
      if (bladeTokenName.startsWith("surface.background")) {
        props["backgroundColor"] = {
          value: bladeTokenName,
          type: "string",
        };
      }
    }
  }

  let children: TransformFunctionReturnType = { component: "", imports: {} };
  if (bladeFrame.children && bladeFrame.children.length > 0) {
    children = generateBladeCode({
      bladeNodes: bladeFrame.children,
    });
  }

  return {
    component: component("Box", {
      props,
      defaultValues,
      children: children.component,
    }),
    imports: mergeImports(children.imports ?? {}, bladeImports(["Box"])),
  };
};
