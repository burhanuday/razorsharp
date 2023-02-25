import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeNode,
  BladeTextNode,
} from "../types/Blade";
import { transformFrame } from "./components/box";
import { transformButton } from "./components/button";
import { transformText } from "./components/text";
import { transformTextInput } from "./components/textInput";

const generateBladeComponentInstanceCode = (
  bladeComponentInstance: BladeComponentInstanceNode
): string => {
  switch (bladeComponentInstance.name) {
    case "Button":
      return transformButton(bladeComponentInstance);
    case "Text Input":
      return transformTextInput(bladeComponentInstance);

    default:
      return "";
  }
};

const generateBladeFrameCode = (bladeNode: BladeFrameNode): string => {
  return transformFrame(bladeNode, generateBladeCode);
};

const generateTextNodeCode = (bladeNode: BladeTextNode): string => {
  return transformText(bladeNode);
};

export const generateBladeCode = ({
  bladeNodes,
}: {
  bladeNodes: BladeNode[];
}): string => {
  let code = "";

  bladeNodes.forEach((bladeNode) => {
    switch (bladeNode.type) {
      case "INSTANCE":
        code += generateBladeComponentInstanceCode(
          bladeNode as BladeComponentInstanceNode
        );
        break;

      case "FRAME":
        code += generateBladeFrameCode(bladeNode as BladeFrameNode);
        break;

      case "TEXT":
        code += generateTextNodeCode(bladeNode as BladeTextNode);
        break;

      default:
        break;
    }
  });

  return code;
};
