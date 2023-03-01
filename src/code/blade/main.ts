import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeGroupNode,
  BladeNode,
  BladeTextNode,
} from "../types/Blade";
import { TransformFunctionReturnType } from "../types/TransformFunction";
import { transformFrameOrGroup } from "./components/box";
import { transformButton } from "./components/button";
import { transformIcon } from "./components/icon";
import { transformText } from "./components/typography";
import { transformTextInput } from "./components/textinput";
import { isIconInstance } from "./utils/iconUtils";
import { transformBadge } from "./components/badge";
import { transformLink } from "./components/link";
import { transformCheckbox } from "./components/checkbox";

const generateBladeComponentInstanceCode = (
  bladeComponentInstance: BladeComponentInstanceNode
): TransformFunctionReturnType => {
  // check if component instance is an icon
  const isIcon = isIconInstance(bladeComponentInstance);
  if (isIcon) return transformIcon(bladeComponentInstance);

  // handle all other components
  switch (bladeComponentInstance.name) {
    case "Button":
      return transformButton(bladeComponentInstance);
    case "Text Input":
      return transformTextInput(bladeComponentInstance);
    case "Badge":
      return transformBadge(bladeComponentInstance);
    case "Link":
      return transformLink(bladeComponentInstance);
    case "Checkbox":
      return transformCheckbox(bladeComponentInstance);

    default:
      return { component: "" };
  }
};

const generateBladeFrameCode = (
  bladeNode: BladeFrameNode
): TransformFunctionReturnType => {
  return transformFrameOrGroup(bladeNode, generateBladeCode);
};

const generateTextNodeCode = (
  bladeNode: BladeTextNode
): TransformFunctionReturnType => {
  return transformText(bladeNode);
};

const generateGroupNodeCode = (
  bladeNode: BladeGroupNode
): TransformFunctionReturnType => {
  return transformFrameOrGroup(bladeNode, generateBladeCode);
};

export const generateBladeCode = ({
  bladeNodes,
}: {
  bladeNodes: BladeNode[];
}): TransformFunctionReturnType => {
  let componentCode = "";

  bladeNodes.forEach((bladeNode) => {
    switch (bladeNode.type) {
      case "INSTANCE":
        componentCode += generateBladeComponentInstanceCode(
          bladeNode as BladeComponentInstanceNode
        ).component;
        break;

      case "FRAME":
        componentCode += generateBladeFrameCode(
          bladeNode as BladeFrameNode
        ).component;
        break;

      case "TEXT":
        componentCode += generateTextNodeCode(
          bladeNode as BladeTextNode
        ).component;
        break;

      case "GROUP":
        componentCode += generateGroupNodeCode(
          bladeNode as BladeGroupNode
        ).component;

      default:
        break;
    }
  });

  return { component: componentCode };
};
