# Fresh验证与独立审查

Fresh Verification 指完成前重新执行的验证证据，包括测试命令、契约校验、关键路径检查或人工审查结论。任何「完成 / 可合并 / 可发布」结论必须基于本轮 fresh verification，不接受「之前跑过」或实现者自述。`project-instance` 对应阶段是 `stage.verification`，工作单元是 `work-unit.verification`，产物是 `artifact.fresh-verification` 与 `artifact.checkpoint`；命中门禁为 `gate.fresh-verification-passed`（证据 `evidence.fresh-verification`、`evidence.test-verification`）和 `gate.merge-approved`（证据 `evidence.approval-record`、`evidence.checkpoint-and-rollback`）。见 [[产品研发生命周期]]、[[条件强制门禁]] 与 [[Agent入口规则]]。

实现者不能承担命中的独立审查（含数字人）。`docs/agents/digital-human-roles.yaml` 规定 `implementer_must_differ: true`：`work-unit.slice-implementation` 由测试 Agent 会签；`gate.fresh-verification-passed` 由测试 Agent 起草、架构 Agent 会签。Harness Orchestrator 不自行关闭独立验证门禁，也不替实现者完成独立验证。高风险架构、OpenAPI Freeze、`gate.merge-approved`、对外商务承诺和运行时外部副作用仍须生物人。会签文件经 `scripts/verify-approval-record` 核验。

模板维护按 L1 / L2 / L3 分别使用 `self-check` / 人工 checkpoint、`focused-independent`、`formal-independent`（见 [[模板维护流程]] 与 [[影响面分诊与流程裁剪]]）。强度由 `docs/process/maintenance-intensity.yaml` 计算，未给出 trigger 时使用该策略的 `default_level`（当前为 L2）。L1 至少一项与变更直接相关的实际检查；L2 需要修改前可失败的最小反例以及本轮 fresh verification；L3 需要完整 RED、GREEN、REFACTOR、压力场景与本轮 fresh verification。模板源对应工作单元是 `work-unit.intensity-aware-verification` 与 `work-unit.intensity-aware-review`。模板发布、代码切片和高风险变更仍必须由其他 Agent 或独立审查者完成。

前端验证优先 `pnpm`，后端验证优先项目根 `./mvnw`，证据分别记入 `evidence.frontend-verification` 与 `evidence.backend-verification`。UI 影响切片的前端实现还原验证由独立 Reviewer 执行，不是绝对像素复刻或普通 type-check（见 [[产品设计影响与原型]]）。测试质量基线是模板推荐值：Domain / Application `>= 90%`、API `>= 80%`、前端组件 `>= 75%`、已明确的关键流程 `100% E2E`。只有项目实例在测试策略中明确采纳或覆盖后才构成 CI 门禁；未定义关键流程清单时，不得声称其 E2E 覆盖率达到 100%。YSS Skill Execution Result 必须由 实现合同编译器、Harness Orchestrator 和独立 Reviewer 复核，实现者自报 `implemented` 不构成最终通过（见 [[切片实现合同]] 与 [[YSS路由与合同编译]]）。

Git checkpoint 只包含本轮明确范围，须列出验证命令、Ticket 状态和下一步；获得用户授权后才提交或推送（见 [[Ticket与流程状态]]）。出现架构返工、验证返工、IMPORTANT / CRITICAL review finding 或人工确认延期时，按 [[复盘与权威资产修订]] 回流。

## 来源

- `AGENTS.md`
- `CONTEXT.md`
- `docs/process/lifecycle-registry.yaml`
- `docs/process/harness-process-tailoring.md`
- `docs/process/maintenance-intensity.yaml`
- `docs/agents/digital-human-roles.yaml`
