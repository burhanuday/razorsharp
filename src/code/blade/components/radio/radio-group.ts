import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { findNode } from "../../utils/findNode";
import { transformRadio } from "./radio";
import { defaultValues } from "./constants";
import { bladeImports, mergeImports } from "../../utils/imports";

export const transformRadioGroup = (
  bladeInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const labelTextNode = findNode(
    bladeInstance,
    (node) =>
      node.layerName === "Label" &&
      node.type === "TEXT" &&
      node.parent?.layerName === "Label Holder"
  );
  const label = (labelTextNode as BladeTextNode)?.characters;

  const isHelpTextPresent = isPresent(
    bladeInstance.componentProperties.helpText?.value
  );

  let helpText = "";
  if (isHelpTextPresent) {
    const helpTextNode = findNode(
      bladeInstance,
      (node) =>
        node.layerName === "Help Text" &&
        node.type === "TEXT" &&
        node.parent?.layerName === "Help Group"
    );
    helpText = (helpTextNode as BladeTextNode)?.characters;
  }

  const size = jsxValue(
    bladeInstance.componentProperties.size?.value
  ).toLowerCase();

  const props: BladeProps = {
    label: {
      value: label,
      type: "string",
    },
    helpText: {
      value: helpText,
      type: "string",
    },
    size: {
      type: "string",
      value: size,
    },
  };

  const childrenWrapper = findNode(
    bladeInstance,
    (node) => node.layerName === "Radio Button Group" && node.type === "FRAME"
  ) as BladeFrameNode;

  const { component: children, imports } = childrenWrapper.children
    .map(transformRadio)
    .reduce(
      (acc, val) => {
        acc.component = acc.component + val.component;
        acc.imports = mergeImports(acc.imports ?? {}, val.imports ?? {});
        return acc;
      },
      {
        component: "",
        imports: {},
      }
    );

  return {
    component: component("RadioGroup", {
      props,
      defaultValues: defaultValues,
      children,
    }),
    imports: mergeImports(imports ?? {}, bladeImports(["RadioGroup"])),
  };
};
