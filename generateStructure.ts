// generateStructure.ts

// import fs from "fs";
// import path from "path";
import * as fs from 'fs';
import * as path from 'path';

function getStructure(dir: string, depth = 0): string {
  const files = fs.readdirSync(dir);
  let structure = "";

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    structure += "  ".repeat(depth) + "|-- " + file + "\n";

    if (isDirectory) {
      structure += getStructure(fullPath, depth + 1);
    }
  });

  return structure;
}

// Run and save the output
const projectStructure = getStructure(process.cwd());
fs.writeFileSync("project-structure.txt", projectStructure);

console.log("✅ Project structure saved to project-structure.txt");
