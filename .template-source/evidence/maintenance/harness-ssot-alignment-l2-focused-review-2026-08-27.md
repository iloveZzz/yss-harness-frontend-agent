# Harness SSOT 对齐 L2 聚焦审查结论

- 审查模式：`focused-independent`（非实施者；本文件为对上一轮 Changes requested 的复核，覆盖写入）
- 日期：2026-08-27
- 仓库身份：`yss-project.yaml` → `repository_mode: template-source`（`yss-harness-dev-agent`）
- 审查请求：`.template-source/evidence/maintenance/harness-ssot-alignment-l2-review-request-2026-08-27.md`
- 修订反例：`.template-source/evidence/maintenance/harness-ssot-alignment-l2-revision-counterexample-2026-08-27.txt`
- 修订验证：`.template-source/evidence/maintenance/harness-ssot-alignment-l2-revision-fresh-verification-2026-08-27.txt`
- 总评：**Approved**

本结论只覆盖审查请求中的 6 个问题、所列关键路径，以及上一轮必须改的句子。未改生命周期注册表、门禁、校验器或技能分层；也不对父仓旧八阶段入口作裁决。这是 L2 聚焦审查，不是模板发布或合并裁决。

## 范围

对照权威 YAML（只读，与上一轮相同）：

- `docs/agents/yss-skill-registry.yaml`：`status: active`
- `docs/agents/digital-human-roles.yaml`：研发角色仅架构 / 前端 / 后端 / 测试
- `docs/process/lifecycle-registry.yaml`：五阶段；无 `system-data-engineering`
- `.agents/skills/harness-orchestrator/references/orchestration-contract.yaml`：`work-unit.tactical-design` 的 `primary_skill` 为 `architecture-agent`，`yss-tactical-design` 为 supporting

复核对象：上一轮 Fail 的用户指南句子、可选残留（退役词前缀、「调度」→「使用」），以及修订 counterexample / fresh-verification。未修改除本文件以外的任何文件。

## 上一轮必须改句子的关闭情况

| 上一轮要求 | 现状 | 关闭 |
|---|---|---|
| `需求澄清指南.md` §4 改为「显式兼容入口的追问收口」，流程图回交五阶段 | 标题与声明已改；流程图为显式 grill → 回交 `harness-orchestrator` 五阶段；`to-spec` 仅再次显式调用 | 是 |
| `需求澄清最佳实践.md` §1.4 实施计划回交 Orchestrator | 现句将实施计划回交五阶段；`to-spec` / `to-tickets` 仅显式兼容；`yss-router` 不作为 grill 默认下一跳 | 是 |
| `生命周期最佳实践.md` §2.1.1 表只用五阶段 / 注册表对象 | 「从哪里继续」列已换成 `harness-entry` / `tactical-design` / `slice-contract` / `verification` / `artifact.data-architecture` / `gate.openapi-freeze-confirmed` | 是 |
| 同节末句回到 `harness-entry` 校验上游 | 现句回到 `harness-entry` 重校验上游 Discovery / Spec，并写明它们不是当前主阶段 | 是 |
| §2.3 不再把系统概要设计当主阶段 | 现句升级到五阶段工作单元；系统概要设计只作上游产物或战术设计输入 | 是 |
| §1.3 AGENTS.md 行声明本手册不另定义阶段或门禁 | 现句指向 `lifecycle-registry.yaml`，并写「本手册不另定义阶段或门禁」 | 是 |
| §6 改为实践检查清单且不是第二套门禁 | 标题为「实践检查清单」；节首声明以 `gate.*` 为准，不得替代 `gate.fresh-verification-passed` / `gate.merge-approved` | 是 |
| 可选：CONTEXT.md 退役词加「（已退役）」 | 需求经理 / 产品经理 / 商务 / 主控数字人均已加前缀；商务行不再挂「对外商务承诺仍须生物人」 | 是（可选） |
| 可选：AGENTS.md / README「调度」改「使用」 | 两处及 `docs/requirements/README.md` 均为 `architecture-agent` 使用 `yss-tactical-design` | 是（可选） |

修订反例中的 FOUND 句在 live 源中已搜不到；修订 GREEN 所列 replacement 句均在对应文件中。

## 逐项结论

### 1. CONTEXT.md 旧数字人角色 — Pass

现行角色仍是四类专业 Agent；退役行带「（已退役）」前缀，含义以「已退役旧职称 / 已退役称呼」起句，禁止当作当前 `role.*` 或会签人。未把需求经理 / 产品经理 / 商务写成当前数字人角色。

### 2. 技能注册表 `shadow` / `active` — Pass

`docs/agents/yss-skill-registry.yaml` 为 `status: active`。`AGENTS.md`、`CONTEXT.md`、`docs/agents/README.md` 仍与之一致。关键路径无 `shadow`。

### 3. `yss-tactical-design` 旧阶段 / `yss-stage-decision` — Pass

`output-template.md` 仍为 `stage: tactical-design`、`owner: role.architecture-agent`。SKILL.md 仍将 `yss-stage-decision` 限定为只读迁移提示、不参与当前路由。无 `system-data-engineering`。

### 4. `AGENTS.md` 入口、领域路由、主控数字人 — Pass

仍只读当前仓库根入口。领域影响由 `role.architecture-agent` **使用** `yss-tactical-design`（专项表同文）。正文无「主控数字人」。与编排合同 primary / supporting 关系一致。

### 5. README / 用户指南是否仍把 `grill-with-docs` → `to-spec` → `to-tickets` 写成默认生命周期 — Pass

上一轮 Fail 点已关。`README.md`、需求 README、用户手册索引、产品生命周期工作流、生命周期最佳实践 §2.1 仍声明三件套仅为显式兼容入口。`需求澄清指南.md` §4 不再用「推荐流程」承载 grill → to-spec → 系统/数据架构默认链。`需求澄清最佳实践.md` §1.4 不再把实施计划交给 `to-spec`。

### 6. 派生说明是否写成第二套阶段或门禁定义 — Pass

上一轮 Fail 点已关。关键路径中的默认链路与检查清单均回指 `lifecycle-registry.yaml` 的五阶段与 `gate.*`。系统概要设计 / 业务架构 / 产品总体设计在修订后的句子里被标明为上游输入或产物，不是当前主阶段。§6 不再自称门禁。

## 残留风险

- `docs/user-guide/需求澄清指南.md` §2 表「进入 Spec 前」的下一步产物仍写 `` `to-spec` 输入 ``。同文件 §4 / §7 已限制为显式调用，故不构成第 5 问 Fail；若再被误读，可改成「批准的 Spec；用户显式时才用 `to-spec`」。
- `docs/user-guide/生命周期最佳实践.md` §2.2 仍有「升级到最早受影响阶段并补齐下游门禁」。在 §2.1.1 已映射到五阶段的前提下可接受；不宜单独读成新的阶段表。
- `docs/architecture/`、`docs/design/`、`docs/templates/` 仍使用业务架构 / 产品总体设计 / 系统概要设计等上游工作名。不在本轮关键路径，且本轮不改生命周期注册表。后续维护应继续标明它们是产物而非主阶段。
- 修订 fresh-verification 只证明审查点句子的 RED/GREEN，未复跑 `scripts/verify-template`。本审查亦未复跑模板校验。这不影响本次句子级关闭结论，但不能当作发布证据。

## 总评

**Approved。**

第 1–4 问维持 Pass。第 5–6 问在修订后关闭：用户指南不再把 `grill-with-docs` → `to-spec` → `to-tickets` 写成默认生命周期，也不再把系统概要设计 / 业务架构 / 「质量门禁」写成第二套阶段或门禁定义。可选残留（退役前缀、「使用」代替「调度」）已一并处理。

这是 L2 聚焦审查通过，证明本轮 SSOT 对齐在审查请求范围内可被接受。它不是模板发布批准，也不是合并裁决；发布仍须按 L3 / `scripts/verify-template` 与独立审查另行取证。
