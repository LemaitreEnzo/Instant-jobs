import fs from "fs";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";
import { kebabCase, pascalCase } from "../utils/case.util.js";

const __filename: string = decodeURI(new URL(import.meta.url).pathname);
const __dirname: string = path.dirname(__filename);

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "componentName",
      message: "Nom du composant ?",
      validate: (input) =>
        input.trim() ? true : "Le nom du composant est requis",
    },
    {
      type: "select",
      name: "parentDir",
      message: "Nom du dossier parent ?",
      choices: [
        {
          name: "ui",
          value: "ui",
        },
        {
          name: "pages",
          value: "pages",
        },
        {
          name: "layout",
          value: "layout",
        },
        {
          name: "common",
          value: "common",
        },
      ],
    },
  ]);

  const componentName = pascalCase(answers.componentName);
  const parentDir = answers.parentDir;
  const className = kebabCase(componentName);

  const componentDir = path.join(
    __dirname,
    "..",
    "components",
    parentDir,
    componentName,
  );

  console.log("\n");

  const folderSpinner = ora(`Création du dossier ${componentName}`).start();

  fs.mkdirSync(componentDir, { recursive: true });
  folderSpinner.succeed(`Dossier ${componentName} créé`);

  const fileSpinner = ora(
    `Génération des fichiers ${componentName}.tsx et ${componentName}.css`,
  ).start();

  const tsxTemplate = `import "./${componentName}.css";

export default function ${componentName}() {
  return (
    <div className="${className}">
      ${componentName}
    </div>
  );
}
`;

  const cssTemplate = `.${className} {

}
`;

  fs.writeFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    tsxTemplate,
    "utf-8",
  );

  fs.writeFileSync(
    path.join(componentDir, `${componentName}.css`),
    cssTemplate,
    "utf-8",
  );

  fileSpinner.succeed(
    `Fichiers générés ${componentName}.tsx et ${componentName}.css`,
  );

  console.log("\n🚀 Composant créé avec succès !");
  console.log("Chemin du composant: ", componentDir);
}

main();
