import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { TransformFunctionReturnType } from "~/code/types/TransformFunction";
import { jsxValue } from "../utils/attributes";
import { component } from "../utils/component";
import { isPresent } from "../utils/isPresent";
import { traverseNodeTree } from "../utils/traverseNodeTree";

const defaultValues: BladeProps = {
  labelPosition: { value: "top", type: "string" },
  showClearButton: { value: "false", type: "string" },
};

export const transformTextInput = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  const componentProperties = bladeComponentInstance.componentProperties;

  const isHelpTextPresent = isPresent(componentProperties.helpText.value);

  // TODO handle icon
  const isIconPresent = isPresent(componentProperties.icon.value);

  const isMaxCharactersPresent = isPresent(
    componentProperties.maxCharacters.value
  );
  const isPrefixPresent = isPresent(componentProperties.prefix.value);
  const isSuffixPresent = isPresent(componentProperties.prefix.value);

  const props: BladeProps = {
    labelPosition: {
      value: jsxValue(componentProperties.labelPosition.value).toLowerCase(),
      type: "string",
    },
    showClearButton: {
      value: jsxValue(componentProperties.showClearButton.value),
      type: "boolean",
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

  if (isSuffixPresent) {
    const suffixNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Trailing Label" && node.type === "TEXT"
    );

    props["suffix"] = {
      value: (suffixNode as BladeTextNode)?.characters,
      type: "string",
    };
  }

  if (isPrefixPresent) {
    const prefixNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Leading Label" && node.type === "TEXT"
    );

    props["prefix"] = {
      value: (prefixNode as BladeTextNode)?.characters,
      type: "string",
    };
  }

  return { component: component("TextInput", { props, defaultValues }) };
};
