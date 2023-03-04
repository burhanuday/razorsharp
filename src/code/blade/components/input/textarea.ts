import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../../utils/attributes";
import { component } from "../../utils/component";
import { isPresent } from "../../utils/isPresent";
import { traverseNodeTree } from "../../utils/traverseNodeTree";
import { defaultValues } from "./constants";

// TODO blade text area component has a prop called
// "showClearButton" but toggle doesn't exist in Figma

export const transformTextArea = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const isHelpTextPresent = isPresent(componentProperties.helperText.value);

  const isMaxCharactersPresent = isPresent(
    componentProperties.maxCharacters.value
  );

  const props: BladeProps = {
    labelPosition: {
      value: jsxValue(componentProperties.labelPosition.value).toLowerCase(),
      type: "string",
    },
    numberOfLines: {
      value: jsxValue(componentProperties.maxLines.value).toLowerCase(),
      type: "number",
    },
  };

  const labelTextNode = traverseNodeTree(
    bladeComponentInstance,
    (node) => node.layerName === "Label" && node.type === "TEXT"
  );
  props["label"] = {
    value: (labelTextNode as BladeTextNode)?.characters,
    type: "string",
  };

  const placeholderTextNode = traverseNodeTree(
    bladeComponentInstance,
    (node) => node.layerName === "Placeholder" && node.type === "TEXT"
  );
  props["placeholder"] = {
    value: (placeholderTextNode as BladeTextNode)?.characters?.trim(),
    type: "string",
  };

  if (isHelpTextPresent) {
    const helpTextNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Help Text" && node.type === "TEXT"
    );
    props["helpText"] = {
      value: (helpTextNode as BladeTextNode)?.characters,
      type: "string",
    };
  }

  if (isMaxCharactersPresent) {
    const maxCharactersNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Char Count" && node.type === "TEXT"
    );

    const maxCharactersCount = (
      maxCharactersNode as BladeTextNode
    )?.characters.split("/")[1];

    props["maxCharacters"] = { value: maxCharactersCount, type: "number" };
  }

  return { component: component("TextArea", { props, defaultValues }) };
};
