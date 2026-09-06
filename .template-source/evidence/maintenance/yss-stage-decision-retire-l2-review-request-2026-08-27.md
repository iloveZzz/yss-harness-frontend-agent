# yss-stage-decision 退役与 wiki refresh L2 聚焦审查请求

> 实施者不得在本文件填写审查结论。

## 范围

物理退役 `yss-stage-decision`；按 `llm-wiki` refresh 更新 `.template-source/wiki`。正式入口保持 `harness-orchestrator`。

## 请审查

1. canonical / 投影 / lock / 注册表是否已无 `yss-stage-decision`。
2. `docs/agents/skill-migrations.md` 是否足以把旧调用送到 `harness-orchestrator` + `yss-tactical-design`。
3. `yss-tactical-design` 是否仍把 `yss-stage-decision` 写成现行 stub。
4. wiki 是否仍把 `yss-product-lifecycle` 当默认编排器，或仍写 8 个主阶段 / 旧 14 个门禁为当前事实。
5. wiki lint 是否通过；adr-0002 缺失是否已改 livePath。
6. 是否误删仍在使用的其他技能。

## 关键路径

- `.agents/skills/yss-stage-decision/`（应已删除）
- `docs/agents/skill-migrations.md`
- `docs/agents/yss-skill-registry.yaml`
- `.agents/skills/yss-tactical-design/SKILL.md`
- `.template-source/wiki/`
- `scripts/lib/scenario-checks.mjs`
- `scripts/lib/skill-governance.mjs`
