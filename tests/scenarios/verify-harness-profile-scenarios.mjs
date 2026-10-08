#!/usr/bin/env node
import assert from "node:assert/strict";
import { checkEntryAlignment, loadEntryAlignmentSources } from "../../scripts/lib/entry-alignment.mjs";
import {
  DEV_AGENT_PROFILE_ID,
  loadHarnessProfile,
  validateHarnessProfile,
} from "../../scripts/lib/harness-profile.mjs";

const source = loadHarnessProfile();
const valid = validateHarnessProfile(source);
assert.equal(source.schema_version, 2);
assert.deepEqual(source.handoff.consumer_capabilities, ["frontend-engineering-design"]);
assert.equal(valid.profile_id, DEV_AGENT_PROFILE_ID);
assert.deepEqual(valid.target_user_roles, [
  "role.architecture-agent",
  "role.frontend-agent",
  "role.test-agent",
]);
assert.equal(valid.terminal_work_unit, "work-unit.verification");
assert.equal(valid.cli_package, "yss");

assert.equal(valid.native_profile, "frontend");
assert.equal(valid.metadata_file, ".yss.json");
const aligned = loadEntryAlignmentSources();
checkEntryAlignment(aligned);
assert.throws(() => checkEntryAlignment({ ...aligned, agentsText: aligned.agentsText.replaceAll("yss init --profile frontend", "yss init --profile unknown") }), /原生初始化入口|native/);

const mutations = [
  ["unknown native profile", (candidate) => { candidate.instantiation.native_profile = "unknown"; }, /native_profile/],
  ["foreign native profile", (candidate) => { candidate.instantiation.native_profile = "design"; }, /native_profile/],
  ["legacy metadata promoted", (candidate) => { candidate.instantiation.metadata_file = ".yss-harness-frontend.json"; }, /metadata_file/],
  ["foreign template source", (candidate) => { candidate.instantiation.template_source = "github:iloveZzz/yss-harness-foreign-agent"; }, /template_source/],
  ["retired source env", (candidate) => { candidate.instantiation.pin_env = "YSS_HARNESS_TEMPLATE_REF"; }, /pin_env|历史/],
  ["retired creation default", (candidate) => { candidate.instantiation.npm_create = "npm create yss-harness-frontend@latest"; }, /npm_create|历史/],
  ["legacy source mismatch", (candidate) => { candidate.instantiation.legacy_cli_package = "create-yss-harness-foreign"; }, /legacy_cli_package/],
  ["wrong profile", (candidate) => { candidate.profile_id = "harness.business-ddd-strategy-handoff"; }, /harness\.frontend-delivery/],
  ["extra target role", (candidate) => candidate.audience.target_user_roles.push("role.product-manager"), /target_user_roles/],
  ["wrong terminal", (candidate) => { candidate.lifecycle.terminal_work_unit = "work-unit.tactical-design"; }, /terminal_work_unit/],
  ["discovery default", (candidate) => { candidate.upstream.discovery_is_default = true; }, /discovery_is_default/],
  ["missing current handoff", (candidate) => { candidate.upstream.strategic_design_handoff.current_schema_version = 3; }, /Handoff v5/],
  ["missing visual baseline", (candidate) => { delete candidate.upstream.strategic_design_handoff.ui_impact_requires_visual_baseline_schema_version; }, /Visual Baseline v1/],
  ["foreign cli", (candidate) => { candidate.instantiation.cli_package = "create-yss-spec"; }, /cli_package/],
];
for (const [name, mutate, pattern] of mutations) {
  const candidate = structuredClone(source);
  mutate(candidate);
  assert.throws(() => validateHarnessProfile(candidate), pattern, name);
}
const lifecycle = structuredClone((await import("../../scripts/lib/lifecycle-registry.mjs")).loadRegistry());
lifecycle.stages.push({ id: "stage.tactical-design", name: "legacy", goal: "legacy", exit_criteria: "legacy" });
assert.throws(() => validateHarnessProfile(source, { lifecycle }), /profile 外活动阶段|tactical-design/);
process.stdout.write("Harness profile 压力场景验证通过\n");
