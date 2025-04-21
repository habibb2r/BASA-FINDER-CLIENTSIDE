"use strict";
// generateStructure.ts
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from "fs";
// import path from "path";
var fs = require("fs");
var path = require("path");
function getStructure(dir, depth) {
    if (depth === void 0) { depth = 0; }
    var files = fs.readdirSync(dir);
    var structure = "";
    files.forEach(function (file) {
        var fullPath = path.join(dir, file);
        var isDirectory = fs.statSync(fullPath).isDirectory();
        structure += "  ".repeat(depth) + "|-- " + file + "\n";
        if (isDirectory) {
            structure += getStructure(fullPath, depth + 1);
        }
    });
    return structure;
}
// Run and save the output
var projectStructure = getStructure(process.cwd());
fs.writeFileSync("project-structure.txt", projectStructure);
console.log("✅ Project structure saved to project-structure.txt");
