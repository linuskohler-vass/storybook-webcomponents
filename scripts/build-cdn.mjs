import { cpSync, readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const outDir = `${root}cdn/${version}`;

cpSync(`${root}dist`, outDir, { recursive: true });

console.log(`CDN bundle written to cdn/${version}/`);
