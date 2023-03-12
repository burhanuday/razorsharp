import { generateBladeCode } from "./blade/main";
import { generateImportsCode } from "./blade/utils/imports";
import { convertIntoBladeNodes } from "./figmaUtils/convertIntoNodes";
import { BladeNode } from "./types/Blade";

// TODO
// Optimise for case when input hasnt changed

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 450, height: 600 });

const run = () => {
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
      type: "empty",
    });
    return;
  }

  const convertedSelection: BladeNode[] = convertIntoBladeNodes(
    figma.currentPage.selection,
    null
  );

  const { component, imports } = generateBladeCode({
    bladeNodes: convertedSelection,
  });

  figma.ui.postMessage({
    type: "result",
    component: component.trim(),
    imports: generateImportsCode(imports ?? {}).trim(),
  });
};

figma.on("selectionchange", () => {
  run();
});

figma.on("documentchange", () => {
  run();
});

// figma.ui.onmessage = (msg) => {
//   run();
// };
