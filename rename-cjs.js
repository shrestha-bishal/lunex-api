import { readdirSync, renameSync, statSync } from "fs";
import { join, extname, basename } from "path";

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

try {
  renameJsToCjs("./dist/cjs");
  console.log("All .js files renamed to .cjs in dist/cjs");
} catch (err) {
  console.error("Rename failed:", err);
  process.exit(1);
}
