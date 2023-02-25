import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeNode,
  BladeTextNode,
} from "../types/Blade";

const convertBaseNode = (
  figmaNode: Readonly<SceneNode>,
  bladeParent: BladeNode | null
): BladeNode => {
  const bladeNode: BladeNode = {
    id: figmaNode.id,
    layerName: figmaNode.name,
    type: figmaNode.type,
    parent: bladeParent,
  };

  return bladeNode;
};

const getComponentName = (figmaNode: Readonly<InstanceNode>): string | null => {
  return figmaNode.mainComponent?.parent?.name ?? null;
};

const convertInstanceToNode = (
  figmaNode: Readonly<InstanceNode>,
  bladeNode: BladeNode
): BladeComponentInstanceNode => {
  const bladeComponentInstance: BladeComponentInstanceNode = {
    ...bladeNode,
    componentProperties: figmaNode.componentProperties,
    type: "INSTANCE",
    children: convertIntoBladeNodes(figmaNode.children, bladeNode),
    name: getComponentName(figmaNode),
  };
  return bladeComponentInstance;
};

const convertTextToNode = (
  figmaNode: Readonly<TextNode>,
  bladeNode: BladeNode
): BladeTextNode => {
  const bladeTextNode: BladeTextNode = {
    ...bladeNode,
    type: "TEXT",
    characters: figmaNode.characters,
    textStyleId: figmaNode.textStyleId,
  };

  return bladeTextNode;
};

const convertFrameToNode = (
  figmaNode: Readonly<FrameNode>,
  bladeNode: BladeNode
): BladeFrameNode => {
  const bladeFrame: BladeFrameNode = {
    ...bladeNode,
    type: "FRAME",
    children: convertIntoBladeNodes(figmaNode.children, bladeNode),
    counterAxisAlignItems: figmaNode.counterAxisAlignItems,
    primaryAxisAlignItems: figmaNode.primaryAxisAlignItems,
    paddingTop: figmaNode.paddingTop,
    paddingRight: figmaNode.paddingRight,
    paddingLeft: figmaNode.paddingLeft,
    paddingBottom: figmaNode.paddingBottom,
    layoutMode: figmaNode.layoutMode,
    itemSpacing: figmaNode.itemSpacing,
  };
  return bladeFrame;
};

export const convertIntoBladeNodes = (
  figmaNodes: ReadonlyArray<SceneNode>,
  bladeParent: BladeNode | null
): Array<BladeNode> => {
  const bladeNodes: BladeNode[] = [];
  figmaNodes.forEach((figmaNode) => {
    if (!figmaNode.visible) {
      return;
    }

    let bladeNode = convertBaseNode(figmaNode, bladeParent);

    switch (figmaNode.type) {
      case "INSTANCE":
        bladeNode = convertInstanceToNode(figmaNode, bladeNode);
        break;
      case "TEXT":
        bladeNode = convertTextToNode(figmaNode, bladeNode);
        break;
      case "FRAME":
        bladeNode = convertFrameToNode(figmaNode, bladeNode);
        break;
      default:
        break;
    }

    bladeNodes.push(bladeNode);
  });

  return bladeNodes;
};
