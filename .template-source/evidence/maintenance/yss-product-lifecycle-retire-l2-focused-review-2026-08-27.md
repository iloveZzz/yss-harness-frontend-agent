# yss-product-lifecycle 退役 L2 聚焦审查结论

- 审查模式：`focused-independent`（非实施者；只写入本文件）
- 日期：2026-08-27
- 仓库身份：`yss-project.yaml` → `repository_mode: template-source`（`yss-harness-dev-agent`）
- 审查请求：`.template-source/evidence/maintenance/yss-product-lifecycle-retire-l2-review-request-2026-08-27.md`
- 反例：`.template-source/evidence/maintenance/yss-product-lifecycle-retire-l2-counterexample-2026-08-27.txt`
- 验证：`.template-source/evidence/maintenance/yss-product-lifecycle-retire-l2-fresh-verification-2026-08-27.txt`
- 总评：**Approved**

本结论只覆盖审查请求中的 6 个问题与所列关键路径。对照政策：`docs/agents/skill-migrations.md`（退役技能不保留物理目录、投影或 lock）；`AGENTS.md`（正式入口是 `harness-orchestrator`）；`docs/agents/digital-human-roles.yaml` 与 `docs/process/lifecycle-registry.yaml` 不得被本轮改成旧八阶段；本轮只退役 `yss-product-lifecycle`，`yss-stage-decision` 必须仍在。这是 L2 聚焦审查，不是模板发布或合并裁决。

未修改除本文件以外的任何文件。未复跑 `scripts/verify-template`；live 树与实施者 GREEN 日志交叉核对。

## 范围与对照资产

| 请求问题 | 对照 |
|---|---|
| 1. canonical / 投影 / lock | `.agents/skills/` 及 `.claude` / `.codex` / `.cursor` / `.hermes` / `.pi` / `.qoder` / `.trae` 的 `skills/`；`skills-lock.json` |
| 2. 现行条目 | `docs/agents/yss-skill-registry.yaml`；`yss-public-skills.json` |
| 3. 迁移说明 | `docs/agents/skill-migrations.md` |
| 4. 不得存在 | `scripts/lib/scenario-checks.mjs`；`scripts/lib/skill-governance.mjs`；`scripts/lib/skill-supply-chain.mjs` 的 `OBSOLETE` |
| 5. 现行默认入口 | `AGENTS.md`；`docs/user-guide/`；`.agents/skills/yss-router/references/router-contract.yaml` |
| 6. 误删 | `.agents/skills/yss-stage-decision/`；registry / lock / 七套投影；五阶段与四角色 YAML |

RED 反例记录退役前 live 面仍有 canonical `SKILL.md`、registry `id`、公开清单导出，且压力场景仍要求 stub。GREEN 记录 canonical / registry / 公开清单已清除，迁移节存在，并声称 `verify-skill-registry`、`verify-skill-governance`、`verify-lifecycle-registry`、`verify-matt-yss-integration-scenarios`、`sync-skills --check`、`update-skill-lock --check`、`verify-template` 退出 0。

## 逐项结论

### 1. canonical 目录、各 Agent 投影和 `skills-lock.json` 是否已无该技能 — Pass

`.agents/skills/yss-product-lifecycle/SKILL.md` 不存在；`.agents/skills/` 目录列表无该名。七套投影 `.claude/skills`、`.codex/skills`、`.cursor/skills`、`.hermes/skills`、`.pi/skills`、`.qoder/skills`、`.trae/skills` 均无该目录，对应 `SKILL.md` 均不存在。`skills-lock.json` 全文无 `yss-product-lifecycle`。符合「退役技能不保留物理目录、投影或 lock 条目」。

### 2. `docs/agents/yss-skill-registry.yaml` 与 `yss-public-skills.json` 是否已无现行条目 — Pass

`yss-skill-registry.yaml` 无 `id: yss-product-lifecycle`，aliases 也未挂该名。`yss-public-skills.json` 的 `skills` 数组及各 grouping 的 `skills` 均不含该 id。分组文案「用于 YSS 产品生命周期、路由和跨仓库协作的技能」是类目描述，列出的是 `yss-microapp-commit` / `yss-router` / `yss-source-index`，不构成现行技能条目。

### 3. `docs/agents/skill-migrations.md` 是否足以把旧调用送到 `harness-orchestrator`，且未写成第二套生命周期 — Pass

`## yss-product-lifecycle` 声明已退役、不再作为 Router alias / 默认发现入口 / 公开技能 / 独立物理技能。迁移目标是正式编排入口 `harness-orchestrator`，领域侧指向 `architecture-agent` 使用 `yss-tactical-design`，切片合同由 `yss-router` 出草案、Orchestrator 批准。旧调用或旧阶段资产返回 `blocked`，引用 `harness-agent-contract-v1`，由 Orchestrator 重建当前版本上游输入、Tactical Design Contract 和 Slice Implementation Contract。禁止同名兼容目录，禁止恢复需求 / 产品 / 商务 / 项目管理角色。

该节没有定义阶段、门禁、工作单元或证据 ID，不替代 `lifecycle-registry.yaml`。与同文件 `high-fidelity-html-prototype` 节的「历史名称唯一持久兼容说明」体例一致。

### 4. 压力场景 / 治理校验是否改为断言「不得存在」，而不是再要求 stub 文件 — Pass

相对 RED 反例中 `scenario-checks.mjs` 仍要求 `.agents/skills/yss-product-lifecycle/SKILL.md` stub：

- `verifyReplacementBoundary()` 现为 `ensure(!exists(".agents/skills/yss-product-lifecycle"))`，并断言公开清单不得导出该 id；`matt` profile 的 `files` 不再包含该 stub，仅要求 `skill-migrations.md` 同时出现旧名与 `harness-orchestrator`。
- `skill-governance.mjs` 在物理目录、registry alias 或 canonical id 任一残留时 `fail`。
- `skill-supply-chain.mjs` 的 `OBSOLETE` 含 `yss-product-lifecycle`，残留 canonical 会被当作过期技能。

现行脚本不再要求保留 stub 文件。`matt` 标记要求迁移文档出现旧名，这是兼容说明，不是 stub。

### 5. 是否残留可被 Agent 当默认入口的现行路由（`AGENTS.md`、用户指南、Router 合同） — Pass

- `AGENTS.md` §3 写明旧入口已退役、不得参与当前分支路由，迁移见 `skill-migrations.md`；§5 / §8 正式入口是 `harness-orchestrator`。出现旧名只为禁止路由，不是默认入口。
- `docs/user-guide/` 无 `yss-product-lifecycle`。`产品生命周期工作流.md`、`需求澄清指南.md`、`需求澄清最佳实践.md` 默认入口均为 `harness-orchestrator` 五阶段；`grill-with-docs` / `to-spec` / `to-tickets` 仅显式兼容。
- `yss-router` 合同 `skill_aliases` 无该名；`work-unit.harness-entry` / `work-unit.slice-contract` 的 `primary_skill` 为 `harness-orchestrator`。Router SKILL 写明自己不是生命周期主控。
- `README.md` 的 `project-instance` 路径为 `harness-orchestrator` 五阶段。`CONTEXT.md` 无该技能名。

权威 YAML 未被改回旧八阶段：`lifecycle-registry.yaml` 仍是 `stage.harness-entry` → `stage.tactical-design` → `stage.slice-contract` → `stage.slice-implementation` → `stage.verification`；`digital-human-roles.yaml` 研发角色仍是 `role.architecture-agent` / `role.frontend-agent` / `role.backend-agent` / `role.test-agent`，`runtime_policy.lifecycle_control` 为 `harness-orchestrator`。

### 6. 是否误删仍在使用的 `yss-stage-decision` 或其他技能 — Pass

`yss-stage-decision` 仍在：canonical `.agents/skills/yss-stage-decision/`（含 `SKILL.md`、references、scripts、tests）；七套投影均有该目录；`skills-lock.json` 仍登记 `skillPath: .agents/skills/yss-stage-decision/SKILL.md`；registry 仍为 `id: yss-stage-decision`，`layer: compatibility`，`maturity: deprecated`，`instance_default_discoverable: false`，`replaced_by: harness-orchestrator`。`OBSOLETE` 不含该 id。SKILL 正文仍是只读迁移提示，正式入口指向 `harness-orchestrator`。

`harness-orchestrator`、`yss-tactical-design`、`yss-router` 及 registry 其余现行技能目录仍在。未发现本轮把仍用技能并入 `OBSOLETE` 或从 lock / 投影成片删除。

## 残留风险

- `.template-source/wiki/`（含 `wiki/raw/AGENTS.md`、`wiki/产品研发生命周期.md` 等）仍把 `yss-product-lifecycle` 写成默认 Discovery 入口。这是派生 wiki 快照，不在第 5 问所列 `AGENTS.md` / 用户指南 / Router 合同之内，也不构成现行 skill 面。live 源已变，后续应用 `llm-wiki` `refresh`，不得当作第二套路由。
- `.template-source/adr/0007-lifecycle-native-work-units.md`、`0013-digital-human-role-overlay.md` 仍称该技能为唯一默认入口或叠加透镜。ADR 是历史决策，不是当前 Agent 入口；不在本轮必须改的句子范围。
- `.gitignore` 仍忽略 `docs/process/yss-product-lifecycle-team-guide.md`。这不是可发现技能或默认入口。
- 既有 L3 checkpoint / 研究证据仍引用已删路径，属于历史证据，不是现行校验器。
- 本审查未复跑 `scripts/verify-template`。GREEN 日志声称退出 0，可支持本 L2 关闭，不能当作发布证据。

## 总评

**Approved。**

第 1–6 问均为 Pass。`yss-product-lifecycle` 已从 canonical、七套投影、`skills-lock.json`、registry 现行条目和公开清单移除；迁移说明把旧调用送到 `harness-orchestrator` 且未另写一套生命周期；压力 / 治理改为断言不得存在；`AGENTS.md`、用户指南、Router 合同无该技能作为默认入口；`yss-stage-decision` 仍在；五阶段与四角色 YAML 未被改成旧八阶段。

这是 L2 聚焦审查通过，证明本轮物理退役在审查请求范围内可被接受。它不是模板发布批准，也不是合并裁决；发布仍须按 L3 / `scripts/verify-template` 与独立审查另行取证。
