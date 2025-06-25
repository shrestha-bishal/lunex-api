import { readdirSync, renameSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";

const targetDir = "./dist/cjs";

/**
 * Recursively rename .js files to .cjs
 */
function renameJsToCjs(dir) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      renameJsToCjs(fullPath);
    } else if (extname(entry) === ".js") {
      const newPath = join(dir, basename(entry, ".js") + ".cjs");
      renameSync(fullPath, newPath);
      console.log(`Renamed ${fullPath} to ${newPath}`);
    }
  }
}

/**
 * Recursively update require() paths to use .cjs
 */
function patchInternalRequires(dir) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      patchInternalRequires(fullPath);
    } else if (extname(entry) === ".cjs") {
      const original = readFileSync(fullPath, "utf8");

      const updated = original.replace(
        /require\((["']\.\/[^'"]+?)(\.js)?(["'])\)/g,
        "require($1.cjs$3)"
      );

      if (updated !== original) {
        writeFileSync(fullPath, updated, "utf8");
        console.log(`Patched: ${fullPath}`);
      }
    }
  }
}

try {
  console.log('Renaming dist/cjs files from .js to .cjs')
  renameJsToCjs(targetDir);
  console.log("All .js files renamed to .cjs in dist/cjs");

  console.log('Running patch for the imports')
  patchInternalRequires(targetDir);
  console.log('Patch completed')
} catch (err) {
  console.error("Rename failed:", err);
  process.exit(1);
}