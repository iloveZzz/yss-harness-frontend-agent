# Harness SSOT 对齐 L2 聚焦审查请求

> 实施者不得在本文件填写审查结论。`result=pass` 只表示本请求可被 checkpoint 校验器解析。

## 范围

对齐本仓 `template-source` 的 Agent 入口、词汇表、战术设计技能内部模板和说明文档，使其与已经生效的四角色五阶段权威 YAML 一致。不改生命周期注册表、门禁、校验器或技能分层。

本仓是 `yss-harness-dev-agent`。父目录 `yss-spec-project-template` 仍使用旧八阶段 `AGENTS.md`，本轮有意不改父仓。

## 请审查

1. `CONTEXT.md` 是否仍把需求经理 / 产品经理 / 商务写成当前数字人角色；退役行是否可能被误读为现行职责。
2. 技能注册表是否仍被描述为 `shadow`；与 `docs/agents/yss-skill-registry.yaml` 的 `status: active` 是否一致。
3. `yss-tactical-design` 是否仍引用已删除的 `stage.system-data-engineering`；`yss-stage-decision` 是否仍被写成现行替代对象。
4. `AGENTS.md` 是否只读取当前仓库根入口，是否把领域影响正确指向 `architecture-agent` + `yss-tactical-design`，是否仍使用「主控数字人」。
5. README / 用户指南是否仍把 `grill-with-docs` → `to-spec` → `to-tickets` 写成默认生命周期。
6. 是否把派生说明写成了第二套阶段或门禁定义。

## 关键路径

- `CONTEXT.md`
- `AGENTS.md`
- `README.md`
- `docs/agents/README.md`
- `.agents/skills/yss-tactical-design/SKILL.md`
- `.agents/skills/yss-tactical-design/references/output-template.md`
- `.agents/skills/architecture-agent/SKILL.md`
- `docs/requirements/README.md`
- `docs/user-guide/产品生命周期工作流.md`
- `docs/user-guide/用户手册索引.md`
- `docs/user-guide/生命周期最佳实践.md`
- `docs/user-guide/需求澄清指南.md`
- `docs/user-guide/需求澄清最佳实践.md`
- `.template-source/evidence/maintenance/harness-ssot-alignment-l2-counterexample-2026-08-27.txt`
- `.template-source/evidence/maintenance/harness-ssot-alignment-l2-fresh-verification-2026-08-27.txt`
