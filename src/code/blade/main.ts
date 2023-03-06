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
import {
  transformHeading,
  transformText,
  transformTitle,
  transformTextNode,
  transformCode,
} from "./components/typography";
import {
  transformOtpInput,
  transformPasswordInput,
  transformTextArea,
  transformTextInput,
} from "./components/input";
import { isIconInstance } from "./utils/iconUtils";
import { transformBadge } from "./components/badge";
import { transformLink } from "./components/link";
import {
  transformCheckbox,
  transformCheckboxGroup,
} from "./components/checkbox";
import { transformRadio, transformRadioGroup } from "./components/radio";
import { transformAlert } from "./components/alert";
import { transformSpinner } from "./components/spinner";
import { transformCounter } from "./components/counter";
import { transformIconButton } from "./components/iconButton";
import { transformIndicator } from "./components/indicator";
import { transformProgressBar } from "./components/progressBar";

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
    case "Title":
      return transformTitle(bladeComponentInstance);
    case "Heading":
      return transformHeading(bladeComponentInstance);
    case "Text":
      return transformText(bladeComponentInstance);
    case "Code":
      return transformCode(bladeComponentInstance);
    case "Radio-Button":
      return transformRadio(bladeComponentInstance);
    case "Checkbox-Group":
      return transformCheckboxGroup(bladeComponentInstance);
    case "Radio-Group":
      return transformRadioGroup(bladeComponentInstance);
    case "Alert":
      return transformAlert(bladeComponentInstance);
    case "Spinner":
      return transformSpinner(bladeComponentInstance);
    case "TextArea Input":
      return transformTextArea(bladeComponentInstance);
    case "Password Input":
      return transformPasswordInput(bladeComponentInstance);
    case "OTP Input":
      return transformOtpInput(bladeComponentInstance);
    case "Counter":
      return transformCounter(bladeComponentInstance);
    case "IconButton":
      return transformIconButton(bladeComponentInstance);
    case "Indicators":
      return transformIndicator(bladeComponentInstance);
    case "ProgressBar":
      return transformProgressBar(bladeComponentInstance);
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
  return transformTextNode(bladeNode);
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
