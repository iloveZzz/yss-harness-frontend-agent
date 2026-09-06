# Agent入口规则

`AGENTS.md` 只保存 Agent 必须首先遵守的仓库身份路由、硬门禁和禁止事项。每个任务开始时先读**当前仓库根**的 `yss-project.yaml` 与 `AGENTS.md`：`template-source` 走模板维护，`project-instance` 按产品研发生命周期分诊；文件缺失或模式非法时停止路由并做迁移检查，不根据目录、Git 远程或占位符猜测身份。不要把父目录、兄弟 submodule 或其他模板仓的 `AGENTS.md` 当作本仓入口。细则见 [[仓库身份与路由]]。

单一事实来源不得在说明文档里重复定义：领域与流程词汇以 `CONTEXT.md` 为准；Agent 入口以 `AGENTS.md` 为准；主阶段、门禁、产物、工作单元、证据和稳定 ID 以 `docs/process/lifecycle-registry.yaml` 为准（`docs/process/lifecycle-artifact-map.md` 只是派生阅读视图）；影响面触发与 `not-applicable` 以 `docs/process/harness-process-tailoring.md` 为准（见 [[影响面分诊与流程裁剪]]）；技能清单、来源、版本、哈希和投影目标以 `skills-lock.json` 为准；技能分层、别名、默认可发现性和运行时入口以 `docs/agents/yss-skill-registry.yaml` 为准（当前 `status: active`，实现合同编译器 / 生命周期必须消费）。四角色、会签与运行时绑定以 `docs/agents/digital-human-roles.yaml` 为准。

落地文档正文统一使用简体中文；英文专有名词、路径、schema、命令与协议 metadata 保持原样。新流程统一使用 Spec、Ticket、`harness-entry`、`tactical-design`、`slice-contract`、`slice-implementation` 和 `verification`。旧入口 `yss-product-lifecycle` 与 `yss-stage-decision` 已退役，迁移路径见 `docs/agents/skill-migrations.md`，不得参与当前分支路由。功能父 Ticket 汇总阶段证据；Spec 初稿、产品设计、原型、OpenAPI Draft 和待冻结资产使用 `ready-for-human`；只有通过必要门禁并具备直接实现条件的垂直切片 Ticket 才能使用 `ready-for-agent`（见 [[Ticket与流程状态]]）。

`project-instance` 新功能或较大变更进入 `harness-orchestrator` 的 Harness Entry。存在领域行为、聚合、不变量、状态、一致性、Domain Event、Gateway 或持久化映射影响时，由 `role.architecture-agent` 使用 `yss-tactical-design` 形成 Tactical Design Contract；无领域影响只记录 `not-applicable`。进入实现前先读 `docs/process/implementation-repo-integration.md` 并登记实现仓库，再由 `yss-implementation-contract-compiler` 编译最小 skill 集合与当前实现合同（见 [[YSS路由与合同编译]]）。前端优先 `pnpm`；后端优先项目根 `./mvnw`。根目录 `CLAUDE.md` 只引用 `AGENTS.md`，不是第二套入口规则。

专项任务必须走指定入口：领域影响用 `architecture-agent` + `yss-tactical-design`；技术事实用 `research`；竞品用 `competitive-intelligence`；UI / 原型先 `yss-design-system` 再 `yss-prototype-stage`；Bug 先 `diagnosing-bugs` 再 `tdd`；冲突用 `resolving-merge-conflicts`；架构治理用 `improve-codebase-architecture` / `codebase-design`；跨线程或过长上下文用 `handoff`；四角色协同先读 `docs/agents/digital-human-roles.yaml`；本地知识库用 [[LLM Wiki]]。实现者不能承担命中的独立审查；完成结论必须基于 fresh verification（见 [[Fresh验证与独立审查]]）。

## 来源

- `AGENTS.md`
- `CONTEXT.md`
- `docs/agents/skill-migrations.md`
- `docs/agents/yss-skill-registry.yaml`
