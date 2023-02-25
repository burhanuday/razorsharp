import {
  BladeComponentInstanceNode,
  BladeProps,
  BladeTextNode,
} from "~/code/types/Blade";
import { jsxValue } from "../utils/attributes";
import { component } from "../utils/component";
import { isPresent } from "../utils/isPresent";
import { traverseNodeTree } from "../utils/traverseNodeTree";

const defaultValues: BladeProps = {
  labelPosition: "top",
  showClearButton: "false",
};

export const transformTextInput = (
  bladeComponentInstance: BladeComponentInstanceNode
): string => {
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
    labelPosition: jsxValue(
      componentProperties.labelPosition.value
    ).toLowerCase(),
    showClearButton: jsxValue(componentProperties.showClearButton.value),
  };

  const labelTextNode = traverseNodeTree(
    bladeComponentInstance,
    (node) => node.layerName === "Label" && node.type === "TEXT"
  );
  props["label"] = (labelTextNode as BladeTextNode)?.characters;

  if (isHelpTextPresent) {
    const helpTextNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Help Text" && node.type === "TEXT"
    );
    props["helpText"] = (helpTextNode as BladeTextNode)?.characters;
  }

  if (isMaxCharactersPresent) {
    const maxCharactersNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Char Count" && node.type === "TEXT"
    );

    const maxCharactersCount = Number(
      (maxCharactersNode as BladeTextNode)?.characters.split("/")[1]
    );

    props["maxCharacters"] = maxCharactersCount;
  }

  if (isSuffixPresent) {
    const suffixNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Trailing Label" && node.type === "TEXT"
    );

    props["suffix"] = (suffixNode as BladeTextNode)?.characters;
  }

  if (isPrefixPresent) {
    const prefixNode = traverseNodeTree(
      bladeComponentInstance,
      (node) => node.layerName === "Leading Label" && node.type === "TEXT"
    );

    props["prefix"] = (prefixNode as BladeTextNode)?.characters;
  }

  return component("TextInput", { props, defaultValues });
};
