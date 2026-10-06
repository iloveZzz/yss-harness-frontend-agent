import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync,rmSync} from "node:fs";
import path from "node:path";
import os from "node:os";
import {createHash} from "node:crypto";
import { validateDefaultDigitalHumanRoles, validateDigitalHumanRoles, loadDigitalHumanRoles, skillIdsFromRegistry } from "../../scripts/lib/digital-human-roles.mjs";
import { loadRegistry } from "../../scripts/lib/lifecycle-registry.mjs";
import { loadSkillRegistry } from "../../scripts/lib/skill-registry.mjs";
import { validateApprovalRecord, validateApprovalRecordFile } from "../../scripts/lib/approval-record.mjs";

function clone() {
  return structuredClone(loadDigitalHumanRoles());
}

function deps() {
  const lifecycle = loadRegistry();
  const skills = loadSkillRegistry();
  const ids = (records) => new Set(records.map((record) => record.id));
  return {
    skillIds: skillIdsFromRegistry(skills),
    stageIds: ids(lifecycle.stages),
    gateIds: ids(lifecycle.gates),
    artifactIds: ids(lifecycle.artifacts),
    evidenceIds: ids(lifecycle.evidence),
    workUnitIds: ids(lifecycle.work_units),
    skillRegistry: skills
  };
}

function mustFail(doc, pattern, label) {
  let failed = false;
  let message = "";
  try {
    validateDigitalHumanRoles(doc, deps());
  } catch (error) {
    failed = true;
    message = error.message;
  }
  if (!failed) throw new TypeError(`错误配置未被拒绝: ${label}`);
  if (!pattern.test(message)) throw new TypeError(`${label} 失败原因不符合预期: ${message}`);
}

validateDefaultDigitalHumanRoles();

const legacyRole = clone();
legacyRole.roles[0].id = "role.product-manager";
mustFail(legacyRole, /v1 必须恰好包含/, "旧角色注入默认集合");

const grokOverflow = clone();
grokOverflow.runtimes.find((runtime) => runtime.id === "runtime.grok").overflow = "forbid";
mustFail(grokOverflow, /禁止超过 4 人/, "Grok 适配器在 overflow=forbid 时拒绝超限协作组");

const coupled = clone();
coupled.roles[0].grok_title = "legacy";
mustFail(coupled, /平台耦合字段/, "角色上残留 grok_title");

const unknownSkill = clone();
unknownSkill.roles[0].core_skills = ["not-a-registered-skill"];
mustFail(unknownSkill, /未登记技能/, "未知技能");

const overlap = clone();
overlap.roles.find((role) => role.id === "role.frontend-agent").forbidden_skills.push(overlap.roles.find((role) => role.id === "role.frontend-agent").core_skills[0]);
mustFail(overlap, /重叠/, "启用且禁止同一技能");

const selfSign = clone();
selfSign.gate_policy.digital_human_review[0].countersigners = [selfSign.gate_policy.digital_human_review[0].drafter];
mustFail(selfSign, /起草者不得会签自己/, "起草者自签");

const mergeByBot = clone();
mergeByBot.gate_policy.biological_human = mergeByBot.gate_policy.biological_human.filter((gate) => gate !== "gate.merge-approved");
mergeByBot.gate_policy.digital_human_review.push({
  gate: "gate.merge-approved",
  countersigners: ["role.test-agent"]
});
mustFail(mergeByBot, /gate\.merge-approved 必须属于 biological_human|门禁被多个会签桶重复占用/, "数字人关闭合并门禁");

const missingSigners = clone();
missingSigners.gate_policy.digital_human_review[0].countersigners = [];
mustFail(missingSigners, /countersigners/, "单审门禁缺 countersigners");

const stringReview = clone();
stringReview.gate_policy.digital_human_review = ["gate.fresh-verification-passed"];
mustFail(stringReview, /必须是含 gate/, "单审门禁仍用字符串名单");

const missingGeneric = clone();
missingGeneric.runtimes = missingGeneric.runtimes.filter((runtime) => runtime.id !== "runtime.generic");
mustFail(missingGeneric, /缺少运行时绑定: runtime.generic/, "缺少通用运行时");

const templateHistory=validateApprovalRecordFile(".template-spec/templates/approval-record-template.yaml", {history:true});
if(templateHistory.execution_authorization!=="not-evaluated")throw new Error("template must not authorize execution");
let templateRejected=false;try{validateApprovalRecordFile(".template-spec/templates/approval-record-template.yaml");}catch{templateRejected=true;}
if(!templateRejected)throw new Error("pending foreign template must be rejected");

const rolesDoc = loadDigitalHumanRoles();
try {
  validateApprovalRecord({
    schema_version: 1,
    gate_id: "gate.fresh-verification-passed",
    decision: "approved",
    actor_kind: "digital-human",
    role_id: "role.frontend-agent",
    runtime_id: "runtime.generic",
    principal_ref: "instance:wrong"
  }, { rolesDoc });
  throw new TypeError("错误配置未被拒绝: 错误角色会签");
} catch (error) {
  if (!/会签角色必须是/.test(error.message)) throw new TypeError(`错误角色会签 失败原因不符合预期: ${error.message}`);
}

try {
  validateApprovalRecord({
    schema_version: 1,
    gate_id: "gate.merge-approved",
    decision: "approved",
    actor_kind: "digital-human",
    role_id: "role.test-agent",
    runtime_id: "runtime.generic",
    principal_ref: "instance:test"
  }, { rolesDoc });
  throw new TypeError("错误配置未被拒绝: 数字人关闭合并门禁记录");
} catch (error) {
  if (!/必须由生物人会签/.test(error.message)) throw new TypeError(`数字人关闭合并门禁记录 失败原因不符合预期: ${error.message}`);
}

process.stdout.write("四角色 Harness Agent 压力场景验证通过\n");

// Current, independently bound synthetic approval at an applicable local gate.
const temp=mkdtempSync(path.join(os.tmpdir(),'fresh-verification-approval-'));
try {
 const sha=raw=>createHash('sha256').update(raw).digest('hex');
 const raw=Buffer.from('Synthetic verification basis, never a real delivery approval.');
 writeFileSync(path.join(temp,'basis.txt'),raw);
 const basis=[{ref:'basis.txt',digest:sha(raw)}],gate_id='gate.fresh-verification-passed';
 const subject=Buffer.from(JSON.stringify({gate_id,basis,approval_scope:['synthetic.verification']}));writeFileSync(path.join(temp,'subject.json'),subject);
 const expected={boundary:gate_id,subject_ref:'subject.json',subject_digest:sha(subject),approval_scope:['synthetic.verification'],basis,drafter_principal_ref:'synthetic.test-author'};
 const record={schema_version:1,gate_id,decision:'approved',actor_kind:'digital-human',role_id:'role.architecture-agent',runtime_id:'runtime.generic',principal_ref:'synthetic.independent-architect',drafter_role_id:'role.test-agent',drafter_principal_ref:expected.drafter_principal_ref,subject_ref:expected.subject_ref,subject_digest:expected.subject_digest,approval_scope:expected.approval_scope,basis};
 const options={root:temp,rolesDoc,registry:loadRegistry(),expected};
 assert.doesNotThrow(()=>validateApprovalRecord(record,options));
 assert.throws(()=>validateApprovalRecord({...record,principal_ref:record.drafter_principal_ref},options),/自签|独立/);
 assert.throws(()=>validateApprovalRecord({...record,gate_id:'gate.spec-baseline-approved'},options),/GATE_POLICY_REQUIRED|未知|未分类/);
}finally{rmSync(temp,{recursive:true,force:true});}
