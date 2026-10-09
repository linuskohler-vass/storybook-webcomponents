import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { parseArgs } from "node:util";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { launch } from "chrome-launcher";
import { preview } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));

function median(values) {
    if (!values.length || values.some((value) => !Number.isFinite(value))) {
        throw new Error("Every audit must report a finite metric value in at least one run");
    }
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarize(reports, budgets) {
    const failedRun = reports.find((report) => report.runtimeError);
    if (failedRun) throw new Error(failedRun.runtimeError.message || failedRun.runtimeError.code);
    if (!budgets || !Object.keys(budgets).length) throw new Error("Configure at least one budget");
    const metrics = {};
    const violations = [];
    for (const [metric, budget] of Object.entries(budgets)) {
        const limits = [budget.min, budget.max].filter((value) => value !== undefined);
        if (
            !limits.length ||
            limits.some((value) => !Number.isFinite(value)) ||
            !["warn", "error"].includes(budget.level)
        ) {
            throw new Error(`Invalid budget for ${metric}`);
        }
        const value = median(
            reports.map((report) => report.categories?.[metric]?.score ?? report.audits?.[metric]?.numericValue),
        );
        metrics[metric] = value;
        if (value < budget.min || value > budget.max) violations.push({ metric, value, ...budget });
    }
    return { metrics, violations };
}

async function main() {
    const { values } = parseArgs({
        options: { "build-dir": { type: "string" }, config: { type: "string" } },
    });
    const config = JSON.parse(await readFile(resolve(root, values.config || "lighthouse.config.json"), "utf8"));
    if (!Number.isInteger(config.numberOfRuns) || config.numberOfRuns < 1 || !config.stories?.length) {
        throw new Error("Configure at least one story and a positive integer numberOfRuns");
    }
    if (!["desktop", "mobile"].includes(config.preset)) throw new Error("Unsupported Lighthouse preset");
    const buildDir = resolve(root, values["build-dir"] || config.staticDistDir);
    const index = JSON.parse(await readFile(resolve(buildDir, "index.json"), "utf8"));
    for (const id of config.stories) {
        if (!/^[a-z0-9_-]+$/i.test(id) || index.entries?.[id]?.type !== "story") {
            throw new Error(`Story not found in build: ${id}`);
        }
    }
    const outputDir = resolve(root, config.outputDir, new Date().toISOString().replaceAll(":", "-"));
    await mkdir(outputDir, { recursive: true });
    const summaries = [];
    let server;
    let chrome;
    try {
        server = await preview({
            configFile: false,
            root,
            build: { outDir: buildDir },
            preview: { host: "127.0.0.1", port: 0, strictPort: true },
        });
        chrome = await launch({ chromeFlags: ["--headless"] });
        const { port } = server.httpServer.address();
        for (const id of config.stories) {
            const url = new URL(`http://127.0.0.1:${port}/iframe.html`);
            url.searchParams.set("id", id);
            url.searchParams.set("viewMode", "story");
            const reports = [];
            for (let run = 1; run <= config.numberOfRuns; run++) {
                console.log(`${id}: run ${run}/${config.numberOfRuns}`);
                const result = await lighthouse(
                    url.href,
                    { port: chrome.port, output: ["html", "json"], logLevel: "error" },
                    config.preset === "desktop" ? desktopConfig : undefined,
                );
                if (!result) throw new Error(`Lighthouse returned no result for ${id}`);
                await Promise.all([
                    writeFile(resolve(outputDir, `${id}-${run}.html`), result.report[0]),
                    writeFile(resolve(outputDir, `${id}-${run}.json`), result.report[1]),
                ]);
                reports.push(result.lhr);
                if (result.lhr.runtimeError)
                    throw new Error(result.lhr.runtimeError.message || result.lhr.runtimeError.code);
            }
            const summary = { story: id, ...summarize(reports, config.budgets) };
            summaries.push(summary);
            console.log(`${id}: ${JSON.stringify(summary.metrics)}`);
            for (const violation of summary.violations) {
                console.warn(`${violation.level.toUpperCase()}: ${id} ${violation.metric} = ${violation.value}`);
                if (violation.level === "error") process.exitCode = 1;
            }
        }
    } finally {
        try {
            if (chrome) await chrome.kill();
        } finally {
            if (server)
                await new Promise((done, reject) =>
                    server.httpServer.close((error) => (error ? reject(error) : done())),
                );
            await writeFile(resolve(outputDir, "summary.json"), JSON.stringify(summaries, null, 2) + "\n");
            console.log(`Lighthouse reports: ${outputDir}`);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
