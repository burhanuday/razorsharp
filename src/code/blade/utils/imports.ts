import { Imports } from "~/code/types/TransformFunction";

export const generateImportsCode = (imports: Imports): string => {
  let code = "";
  for (const [importPath, importNames] of Object.entries(imports)) {
    code += `import { ${Array.from(new Set(importNames)).join(
      ", "
    )} } from "${importPath}";`;
  }

  return code;
};

export const mergeImports = (oldImports: Imports, newImports: Imports) => {
  for (const [importPath, importName] of Object.entries(newImports)) {
    if (oldImports[importPath]) {
      oldImports[importPath] = oldImports[importPath].concat(importName);
    } else {
      oldImports[importPath] = importName;
    }
  }
};
