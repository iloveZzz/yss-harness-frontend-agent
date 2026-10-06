#!/usr/bin/env node
import { runScenario } from "../../scripts/lib/scenario-checks.mjs";
try { runScenario("openapiYaml"); } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
