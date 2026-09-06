# yss-stage-decision 退役与 wiki refresh L2 聚焦审查结论

- 审查模式：`focused-independent`（非实施者；只写入本文件）
- 日期：2026-08-27
- 仓库身份：`yss-project.yaml` → `repository_mode: template-source`（`yss-harness-dev-agent`）
- 审查请求：`.template-source/evidence/maintenance/yss-stage-decision-retire-l2-review-request-2026-08-27.md`
- 反例：`.template-source/evidence/maintenance/yss-stage-decision-retire-l2-counterexample-2026-08-27.txt`
- 验证：`.template-source/evidence/maintenance/yss-stage-decision-retire-l2-fresh-verification-2026-08-27.txt`
- 总评：**Approved**

本结论只覆盖审查请求中的 6 个问题与所列关键路径。对照政策：`docs/agents/skill-migrations.md`（退役技能不保留物理目录、投影或 lock）；`AGENTS.md`（正式入口是 `harness-orchestrator`，旧入口 `yss-product-lifecycle` 与 `yss-stage-decision` 不得参与当前分支路由）；wiki 当前事实应对齐五阶段与现行 8 个 `gate.*`。这是 L2 聚焦审查，不是模板发布或合并裁决。

未修改除本文件以外的任何文件。未复跑 `scripts/verify-template` 或 `lint-wikilinks`；live 树与实施者 GREEN / wiki `log.md` 交叉核对，并抽查 3 条 wikilink。

## 范围与对照资产

| 请求问题 | 对照 |
|---|---|
| 1. canonical / 投影 / lock / 注册表 | `.agents/skills/` 及 `.claude` / `.codex` / `.cursor` / `.hermes` / `.pi` / `.qoder` / `.trae` 的 `skills/`；`skills-lock.json`；`docs/agents/yss-skill-registry.yaml`；`yss-public-skills.json` |
| 2. 迁移说明 | `docs/agents/skill-migrations.md` |
| 3. 不得写成现行 stub | `.agents/skills/yss-tactical-design/SKILL.md` 及 `references/` |
| 4. wiki 当前事实 | `.template-source/wiki/wiki/产品研发生命周期.md`；`条件强制门禁.md`；其余 wiki 文章 |
| 5. wiki lint 与 adr-0002 | `.template-source/wiki/.wiki-manifest.json`；`.template-source/adr/0002-yss-project-repository-mode.md`；抽查 wikilink |
| 6. 误删 | `harness-orchestrator` / `yss-tactical-design` / `yss-router`；lock 共享技能 101；`OBSOLETE` |

RED 反例记录退役前仍存在 canonical `SKILL.md`、registry `id: yss-stage-decision`、`skills-lock.json` 的 `skillPath`。GREEN 记录 canonical / registry id 已清除、迁移节存在、wiki 五阶段声称成立，并声称 `verify-skill-registry`、`verify-skill-governance`、`verify-matt-yss-integration-scenarios`、`sync-skills --check`、`verify-template` 退出 0。

## 逐项结论

### 1. canonical / 投影 / lock / 注册表是否已无 `yss-stage-decision` — Pass

`.agents/skills/yss-stage-decision/` 不存在。七套投影 `.claude/skills`、`.codex/skills`、`.cursor/skills`、`.hermes/skills`、`.pi/skills`、`.qoder/skills`、`.trae/skills` 均无该目录。`skills-lock.json` 全文无该名；`wiki/raw/skills-lock-names.md` 的 101 个共享技能名不含该 id。`docs/agents/yss-skill-registry.yaml` 无 `id: yss-stage-decision`，aliases 也未挂该名。`yss-public-skills.json` 的 `skills` 数组及各 grouping 均不含该 id。

治理面已改为断言不得存在：`scenario-checks.mjs` 的 `verifyReplacementBoundary()` 要求物理目录不存在、迁移文档含 `## yss-stage-decision` 与 `harness-orchestrator`，公开清单不得导出该 id；`skill-governance.mjs` 在物理目录、registry alias 或 canonical id 任一残留时 `fail`；`skill-supply-chain.mjs` 的 `OBSOLETE` 含该 id。

### 2. `docs/agents/skill-migrations.md` 是否足以把旧调用送到 `harness-orchestrator` + `yss-tactical-design` — Pass

`## yss-stage-decision` 声明已退役，不再作为 Router alias、默认发现入口或独立物理技能。迁移目标为：

- 正式编排入口：`harness-orchestrator` 的 `harness-entry`
- 领域战术设计：`architecture-agent` 使用 `yss-tactical-design`

遇到旧 Discovery / 战略设计调用或旧阶段资产时返回 `blocked`，引用 `harness-agent-contract-v1` 并交回 Orchestrator。禁止同名兼容目录，禁止把旧阶段决策包恢复为现行路由。该节没有定义阶段、门禁、工作单元或证据 ID，不替代 `lifecycle-registry.yaml`。与同文件 `yss-product-lifecycle` 节体例一致，且足以覆盖旧调用的编排与领域两条去向。

### 3. `yss-tactical-design` 是否仍把 `yss-stage-decision` 写成现行 stub — Pass

canonical 与 `.claude/skills` 投影的 `SKILL.md` 现句为：旧 Discovery / 战略设计入口已退役，迁移路径见 `docs/agents/skill-migrations.md`。这是历史名称提示，不是「保留只读兼容 stub、仍可发现」的现行路由。`references/` 无该名。该 skill 仍由 `harness-orchestrator` 在 `work-unit.tactical-design` 按领域影响调度，自身不新增主阶段。registry 中 `id: yss-tactical-design` 仍在，`aliases: []`，未把旧名挂回 alias。

### 4. wiki 是否仍把 `yss-product-lifecycle` 当默认编排器，或仍写 8 个主阶段 / 旧 14 个门禁为当前事实 — Pass

`wiki/产品研发生命周期.md` 当前五阶段为 `stage.harness-entry`、`stage.tactical-design`、`stage.slice-contract`、`stage.slice-implementation`、`stage.verification`；编排入口是 `harness-orchestrator`，并写明不是已退役的 `yss-product-lifecycle`。旧 Discovery / 战略设计入口 `yss-stage-decision` 标为已退役。

`wiki/条件强制门禁.md` 当前门禁按 id 为 8 个：`gate.repository-identity-valid`、`gate.tactical-design-approved`、`gate.high-risk-architecture-confirmed`、`gate.slice-contract-approved`、`gate.slice-ready-for-agent`、`gate.openapi-freeze-confirmed`、`gate.fresh-verification-passed`、`gate.merge-approved`。与 live `docs/process/lifecycle-registry.yaml` 及 wiki raw 副本一致，不是旧 14 个门禁清单。

抽查其他文章：`模板总览`、`模板维护流程`、`Ticket与流程状态`、`Agent入口规则`、`技能投影与锁定` 均把两旧入口标为已退役，正式编排为 `harness-orchestrator`。`影响面分诊与流程裁剪.md` 正文现行主阶段为上述五阶段。`产品设计影响与原型.md` 写明现行注册表没有 `stage.product-design`，也没有 `gate.prototype-reviewed` / `verified` / `user-confirmation`。`模板发布门禁与验证.md` 写明不是已退役的八阶段发布门禁。wiki 没有把 8 个主阶段或旧 14 个门禁写成当前事实。

### 5. wiki lint 是否通过；adr-0002 缺失是否已改 livePath — Pass

实施者 GREEN 声称 `verify-template` 退出 0；`wiki/log.md` 本轮 REFRESH 声称 `lint-wikilinks` 23 篇 / 191 条通过。本审查未复跑 lint，抽查 3 条 wikilink，目标文章存在、H1 等于文章 ID、文末有 `## 来源`：

- `wiki/index.md` → `[[产品研发生命周期]]` → `wiki/产品研发生命周期.md`
- `wiki/产品研发生命周期.md` → `[[条件强制门禁]]` → `wiki/条件强制门禁.md`
- `wiki/条件强制门禁.md` → `[[Fresh验证与独立审查]]` → `wiki/Fresh验证与独立审查.md`

`.wiki-manifest.json` 中 `adr-0002` 的 `livePath` 已改为 `.template-source/adr/0002-yss-project-repository-mode.md`；该 live 文件存在，且 `wiki/仓库身份与路由.md` 同步引用该路径。`skill-migrations.md` 与 `yss-public-skills.json` 已登记为 manifest 源。log 里的 `missing: adr-0002` 是同一次 REFRESH 改路径前的快照，不是当前 manifest 状态。

### 6. 是否误删仍在使用的其他技能 — Pass

`harness-orchestrator`、`yss-tactical-design`、`yss-router`、`architecture-agent`、`yss-domain` 的 canonical 目录仍在；registry 仍有对应 `id`；`skills-lock-names.md` 共享技能仍为 101 个且含上述名称。`yss-tactical-design` 未进入 `OBSOLETE`。公开清单仍冻结现行 `yss-*` 工程技能，不含已退役的两入口。未发现本轮把仍用技能并入 `OBSOLETE` 或从 lock / 投影成片删除。本轮允许删除的只有 `yss-stage-decision`。

## 残留风险

- `wiki/影响面分诊与流程裁剪.md` 有 `Status: Disputed`：live `harness-process-tailoring.md` 裁剪矩阵仍把全新产品默认入口写成 Discovery、中等变更写成「Spec / 架构阶段」。wiki 正文已按五阶段陈述，不构成本问 Fail；后续应对齐 live 裁剪矩阵用词。
- `wiki/产品设计影响与原型.md` 同样 `Disputed`：原型技能仍用 `gate.prototype-reviewed` / `verified` / `user-confirmation` 作证据名。文章已标明它们不是注册表当前门禁。
- `wiki/log.md` 仍记录本轮 REFRESH 曾报 `missing: adr-0002`。这是操作日志，不是现行 livePath。
- 既有 L3 checkpoint / 研究证据仍引用已删的 `.agents/skills/yss-stage-decision/`，属于历史证据，不是现行校验器。
- 本审查未复跑 `scripts/verify-template` 或 `lint-wikilinks`。GREEN 与 wiki log 可支持本 L2 关闭，不能当作发布证据。

## 总评

**Approved。**

第 1–6 问均为 Pass。`.agents/skills/yss-stage-decision` 不存在；注册表无该 `id`；`skill-migrations.md` 有 `## yss-stage-decision` 并把旧调用送到 `harness-orchestrator` + `yss-tactical-design`；`yss-tactical-design` 不再把它写成现行 stub；`wiki/产品研发生命周期.md` 为五阶段且编排器是 `harness-orchestrator`；`wiki/条件强制门禁.md` 当前门禁是注册表 8 个 `gate.*`，不是旧 14 个；adr-0002 livePath 已改且 live 文件存在；抽查 wikilink 可解析；未误删仍用技能。

这是 L2 聚焦审查通过，证明本轮物理退役与 wiki refresh 在审查请求范围内可被接受。它不是模板发布批准，也不是合并裁决；发布仍须按 L3 / `scripts/verify-template` 与独立审查另行取证。
