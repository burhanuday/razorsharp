import { BladeProps, BladeTextNode } from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { component } from "../../utils/component";
import { bladeImports } from "../../utils/imports";
import {
  getComponentName,
  getComponentVariant,
  getDefaultValues,
  getSize,
  getWeight,
} from "./utils";

export const transformTextNode = (
  bladeTextNode: BladeTextNode
): TransformFunctionReturnType => {
  let styleName = "";

  if (typeof bladeTextNode.textStyleId === "string") {
    const style = figma.getStyleById(bladeTextNode.textStyleId);
    // "Desktop/TitleMedium"
    styleName = style?.name ?? "";
  }

  if (styleName.length === 0) {
    return {
      component: component("Text", {
        props: {},
        defaultValues: {},
        children: bladeTextNode.characters,
      }),
      imports: bladeImports(["Text"]),
    };
  }

  const variant = getComponentVariant(styleName) || "";
  const weight = getWeight(styleName) || "";
  const name = getComponentName(variant);
  const defaultValues = getDefaultValues(name);
  const size = getSize(styleName);

  const props: BladeProps = {
    variant: { value: variant, type: "string" },
    weight: { value: weight, type: "string" },
    size: { value: size, type: "string" },
  };

  return {
    component: component(name, {
      props,
      defaultValues,
      children: bladeTextNode.characters,
    }),
    imports: bladeImports([name]),
  };
};
