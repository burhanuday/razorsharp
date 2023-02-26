import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeNode,
  BladeTextNode,
} from "../types/Blade";
import { TransformFunctionReturnType } from "../types/TransformFunction";
import { transformFrame } from "./components/box";
import { transformButton } from "./components/button";
import { transformIcon } from "./components/icon";
import { transformText } from "./components/text";
import { transformTextInput } from "./components/textInput";
import { isIconInstance } from "./utils/iconUtils";

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

    default:
      return { component: "" };
  }
};

const generateBladeFrameCode = (
  bladeNode: BladeFrameNode
): TransformFunctionReturnType => {
  return transformFrame(bladeNode, generateBladeCode);
};

const generateTextNodeCode = (
  bladeNode: BladeTextNode
): TransformFunctionReturnType => {
  return transformText(bladeNode);
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

      default:
        break;
    }
  });

  return { component: componentCode };
};
