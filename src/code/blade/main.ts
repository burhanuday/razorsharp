import {
  BladeNode,
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeTextNode,
  BladeGroupNode,
} from "../types/Blade";
import { TransformFunctionReturnType } from "../types/TransformFunction";
import {
  generateBladeComponentInstanceCode,
  generateBladeFrameCode,
  generateTextNodeCode,
  generateGroupNodeCode,
} from "./components";

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
