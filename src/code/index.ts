import { generateBladeCode } from "./blade/main";
import { convertIntoBladeNodes } from "./figmaUtils/convertIntoNodes";
import { BladeNode } from "./types/Blade";

let parentId: string;

const run = () => {
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
      type: "empty",
    });
    return;
  }

  if (figma.currentPage.selection.length > 0) {
    parentId = figma.currentPage.selection[0].parent?.id ?? "";
  }

  const convertedSelection: BladeNode[] = convertIntoBladeNodes(
    figma.currentPage.selection,
    null
  );

  const result = generateBladeCode({
    bladeNodes: convertedSelection,
  }).component;

  figma.ui.postMessage({
    type: "result",
    data: result,
  });
};

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 450, height: 550 });

// TODO
// Optimise rendering in React when inputs havent
// changed
figma.on("selectionchange", () => {
  run();
});

figma.ui.onmessage = (msg) => {
  run();
};
