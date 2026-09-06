# yss-product-lifecycle 退役 L2 聚焦审查请求

> 实施者不得在本文件填写审查结论。`result=pass` 只表示本请求可被 checkpoint 校验器解析。

## 范围

物理退役旧生命周期主控 `yss-product-lifecycle`。正式入口保持 `harness-orchestrator`。不改生命周期注册表的五阶段 ID，不改父仓。

## 请审查

1. canonical 目录、各 Agent 投影和 `skills-lock.json` 是否已无该技能。
2. `docs/agents/yss-skill-registry.yaml` 与 `yss-public-skills.json` 是否已无现行条目。
3. `docs/agents/skill-migrations.md` 是否足以把旧调用送到 `harness-orchestrator`，且未把迁移说明写成第二套生命周期。
4. 压力场景 / 治理校验是否改为断言「不得存在」，而不是再要求 stub 文件。
5. 是否残留可被 Agent 当默认入口的现行路由（`AGENTS.md`、用户指南、Router 合同）。
6. 是否误删仍在使用的 `yss-stage-decision` 或其他技能。

## 关键路径

- `.agents/skills/yss-product-lifecycle/`（应已删除）
- `docs/agents/skill-migrations.md`
- `docs/agents/yss-skill-registry.yaml`
- `yss-public-skills.json`
- `skills-lock.json`
- `scripts/lib/scenario-checks.mjs`
- `scripts/lib/skill-governance.mjs`
- `scripts/lib/skill-supply-chain.mjs`
- `AGENTS.md`
- `.template-source/evidence/maintenance/yss-product-lifecycle-retire-l2-counterexample-2026-08-27.txt`
- `.template-source/evidence/maintenance/yss-product-lifecycle-retire-l2-fresh-verification-2026-08-27.txt`
