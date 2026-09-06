# REFACTOR — create-yss-harness-dev 实例化契约

- 分发清单与指针检查从文档叙述抽到 `scripts/lib/instance-distribution.mjs`。
- Harness Profile 校验与战略仓分离，固定 `harness.dev-agent-slice`。
- `update-skill-lock` 的 tree hash 排序改为与 locale 无关的字符串比较，ASCII `LC_ALL=C` 下 `--check` 与默认 locale 一致。
- 任务包压力场景 fixture 从 `.template-source/evidence/` 迁到 `docs/.scratch/_verify-task-package/`，结束后删除，避免 `project-instance` 被污染。
