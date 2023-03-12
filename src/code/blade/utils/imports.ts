import { Imports } from "~/code/types/TransformFunction";
import { BLADE_IMPORT_PATH } from "../constants/paths";

export const generateImportsCode = (imports: Imports): string => {
  let code = "";
  for (const [importPath, importNames] of Object.entries(imports)) {
    code += `import { ${Array.from(
      new Set(importNames.filter((i) => !!i))
    ).join(", ")} } from "${importPath}";`;
  }

  return code;
};

export const mergeImports = (
  oldImports: Imports,
  newImports: Imports
): Imports => {
  for (const [importPath, importName] of Object.entries(newImports)) {
    if (oldImports[importPath]) {
      oldImports[importPath] = oldImports[importPath].concat(importName);
    } else {
      oldImports[importPath] = importName;
    }
  }

  return oldImports;
};

export const bladeImports = (imports: string[]): Record<string, string[]> => ({
  [BLADE_IMPORT_PATH]: imports.filter((i) => !!i),
});
