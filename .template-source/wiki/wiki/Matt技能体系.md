# Matt技能体系

Matt Engineering Skills 是来自 `mattpocock/skills` 的轻量工程流程技能集合，用于澄清、Spec、Ticket、实现、TDD、诊断、审查和架构治理，不替代 [[YSS工程技能体系]]。

当前锁定 revision 以 `skills-lock.json` 的 `sources` 为准。不要抄可能过期的 README hash。上游技能基线不等于项目当前生效内容；YSS 适配必须同时保留上游内容哈希、有效内容哈希和适配依据（见 [[技能投影与锁定]]）。

`grill-with-docs`、`to-spec`、`to-tickets` 只是用户显式兼容入口。新功能或较大变更的默认路径是 `harness-orchestrator` 的五阶段：`harness-entry` → `tactical-design` → `slice-contract` → `slice-implementation` → `verification`（见 [[产品研发生命周期]]）。旧入口 `yss-product-lifecycle` 已退役。禁止只按 Adapter / Application / Domain / Infrastructure 横向拆分（见 [[垂直切片Ticket]]）。

[[Agent入口规则]] 规定的强制入口包括：领域影响走 `architecture-agent` + `yss-tactical-design`；技术事实走 `research`；竞品走 `competitive-intelligence`；Bug 先 `diagnosing-bugs` 再 `tdd`；冲突走 `resolving-merge-conflicts`；架构治理走 `improve-codebase-architecture` / `codebase-design`；跨线程或过长上下文走 `handoff`。

业务行为默认按 `tdd` 使用已确认的公开 seam 逐切片实现。一次性一手资料走 `research`；要把研究结果落成持久 wiki 则走 [[LLM Wiki]]。

## 来源

- `CONTEXT.md`
- `AGENTS.md`
- `skills-lock.json`
- `docs/agents/skills-maintenance.md`
