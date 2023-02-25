import {
  BladeComponentInstanceNode,
  BladeFrameNode,
  BladeNode,
} from "~/code/types/Blade";

export const traverseNodeTree = (
  node: BladeNode,
  processNode: (node: BladeNode) => boolean | undefined
): null | BladeNode => {
  if (node) {
    const shouldStopTraversal = processNode(node);
    if (shouldStopTraversal) {
      return node;
    }

    if (node.type === "FRAME" || node.type === "INSTANCE") {
      const children = (node as BladeComponentInstanceNode | BladeFrameNode)
        .children;

      for (const child of children) {
        const newNode = traverseNodeTree(child, processNode);
        if (newNode) {
          return newNode;
        }
      }
    }

    return null;
  }

  return null;
};
