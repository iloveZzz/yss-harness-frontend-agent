# Ticket与流程状态

Ticket 是追踪对象，五态是 needs-triage、needs-info、ready-for-agent、ready-for-human、wontfix，不能与数字人角色、合同状态或临时 claimed/resolved 混用。

Tracker 由 issue-tracker.md 显式选择，不能从 Git remote 推断；当前 local-markdown 的 tracker.root 为 .work。旧 roots 只读迁移，既有实例按其配置使用功能包根。平台不可用保留待发布草案与目标，不自动改投。

daily 跨会话更新同一 Ticket/PR；正式父 Ticket 汇总当前批准、阻塞与证据，只有合同已批准且当前、门禁通过、阻塞清除并可实施的窄切片才能 ready-for-agent。

阶段工作项与 checkpoint 不替代 Ticket 五态或批准。提交、推送、发布分别消费用户授权，历史记录或审查结果不自行授予 Git 权限。参见 [[垂直切片Ticket]]、[[产品研发生命周期]]。

## 来源

- `AGENTS.md:77-85`：本页路由、授权及完成边界依据当前入口的 ## 6. 正式 Ticket 与状态。
- `AGENTS.md:110-120`：本页路由、授权及完成边界依据当前入口的 ## 10. 审查、验证与 Git。
- `AGENTS.md:81-84`：正式父 Ticket 汇总批准、阻塞和证据；Slice 必须合同已批准且当前、门禁通过、阻塞清除才能 ready-for-agent；现有当前合同核验复用，Tracker 显式选择。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `AGENTS.md:118-119`：授权消费本地 harness-orchestrator user-decisions；有效范围授权复用，commit/push/publish 分别核验用户授权；返工或重要缺陷触发中文复盘。
- `.template-spec/agents/issue-tracker.md:1-28`：当前 tracker.root 为 .work，既有实例按实际配置使用根。
- `.template-spec/agents/triage-labels.md:3-15`：Ticket 五态不是数字人角色或临时工作状态。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
