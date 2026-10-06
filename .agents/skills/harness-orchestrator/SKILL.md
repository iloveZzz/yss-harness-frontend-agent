---
name: harness-orchestrator
description: 编排前端专职 Harness 的输入接收、合同、任务派发与验证；当需要前端流程路由或恢复时使用。
---

已显式托管的首批阅读包：权威源编辑结束后运行 `scripts/contract render --checkpoint <ref>`；审阅准备或交接前运行 `check-views`。阅读生成失败只恢复派生页，不重做成功源事务。详见 `.template-spec/process/contract-reading.md`。


# Harness Orchestrator

前端工程消费已批准战略；战略预检通过后可起草工程设计与实现计划。仅 Backend / API / Data 影响命中时，最终接收才要求真实后端交付；UI-only 路径按当前合同记录 `backend-not-applicable`。后端架构、API 或数据变更回交后端项目，代码实现仍须当前已批准的 Slice 合同与就绪检查。

这是本专职 Harness 的唯一编排入口。它负责读取 `yss-project.yaml` 与 `CONTEXT.md`、判断影响面、选择下一个未阻塞工作单元、编译任务包、维护合同版本、汇合执行结果和触发重路由。

文档输出时按 `lifecycle-document-output` 条件调用 `i-have-adhd`，读取 `.template-spec/process/document-writing.md`；作用域仅限当前产物，派发时传递条件及引用。

## 边界

- 不起草领域行为、前端页面、后端业务代码或测试代码。
- 不替专业 Agent 修改技术决策；遇到领域、交互、实现或可验证性冲突时先调查实际影响并派发适用专家，阻断依赖动作；缺少真实决定或必要输入时才询问。
- 不批准自己生成的专业资产，不把 实现合同编译器 草案当成 approved，也不以聊天消息代替证据。
- 只有当前版本 `Slice Implementation Contract` 满足就绪公式时，才能设置 `ready-for-agent`。

## 前端联合接收

专职前端 profile 或显式 `frontend_delivery` 输入，按 `.template-spec/process/frontend-backend-delivery.md` 执行战略预检，再起草前端工程设计与实现计划。最终接收按实际后端依赖核验后端交付或有依据的 `backend-not-applicable`；合同批准且当前并满足就绪检查后才派发 Worker。接收、恢复与验收按规定边界重验，缺口回交权威方。通用研发 profile 未选择该路线时维持原行为。

## 按影响面选择工作

先按根 `AGENTS.md` 和 `.template-spec/process/harness-process-tailoring.md` 区分只读咨询、模板维护和产品行动。只读查询不创建 Ticket、checkpoint 或审查任务；模板日常维护由 `maintaining-skills` 自检，仅明确选择独立审查时路由 `work-unit.intensity-aware-review`。注册表有 `public_*` 时优先消费当前展示说明，旧字段保留兼容语义。下列产品流程用于选择当前缺失的工作，已有当前批准资产、登记、父票及 Slice 合同先核验复用，不重走全部阶段或要求未来产物。Fresh Verification 只覆盖当前工作及直接 / 传递依赖；证据复用和边界重验按裁剪合同执行。

## 主流程

1. 校验上游输入、仓库身份、实现仓库、影响面和当前合同版本。
2. 在 `work-unit.frontend-engineering-design` 调度 `architecture-agent` 完成前端工程设计；本地无领域影响记录 not-applicable，不制造 Tactical Design。
3. 形成 frontend_implementation_plan；需要前端脚手架时遵守已批准生成合同。
4. 将同版联合接收摘要与本端实现计划编入 Slice Implementation Contract，另一端分区仅引用已交付合同。
5. 先调度 `test-agent` 建立测试 seam，再调度前端 Worker。
6. 收集每个任务包的 `workflow-execution-result-v1`，完成当前范围的 Fresh Verification；输入或边界变化时重跑受影响检查。
7. 由独立 `test-agent` 返回验证结论；没有阻塞信号时才关闭前端任务，整体切片由统一管理方验收。

## 必须阻断的信号

`blocked`、`stale`、`drift`、`violation`、`new_impacts`、合同版本不一致、写路径越界、验证未执行或证据不可读。

## 便携交接工具

批准交接后由 `scripts/strategic-handoff export --source-root <source> --handoff <ref> --output <new-directory> --zip` 冻结原始资产；规则身份、批准绑定、包内索引和完整快照差异以 `.template-spec/process/strategic-handoff-package.md` 为准。前端可先导入战略并运行 `scripts/verify-frontend-strategic-preflight` 起草工程设计；命中后端依赖时通过 `scripts/backend-delivery import` 联合导入后端快照，再执行 `scripts/verify-frontend-delivery` 完成最终接收。单独战略导入不授予实现资格。工具不能代替生命周期批准。

## 前端专职 profile

先消费 `.template-spec/process/harness-profile.yaml` 的职责与输入条件，再依 `.template-spec/process/frontend-backend-delivery.md` 接力。不得派发另一端实现任务；跨端输入评审必须只读。终点只关闭本端验证，整体业务验收由登记的统一管理方汇总。

## 阶段工作追踪

首次进入允许的 Plan / Spec / Design 或恢复时，读取 `.template-spec/process/stage-tracking.md`，核验 tracker 启用版本与持久 checkpoint。写阶段资产前登记当前工作项；小工作内联，跨负责人 / 独立验收 / 阻塞 / 延期时拆至 work-items。旧项目只读 check 后形成可审阅 plan，显式 apply 才启用；不补造历史完成或批准。完成时逐条关联验收证据，阶段退出回写；结果携带 checkpoint_ref。追踪不得扩大本 profile 的允许阶段，Design 不创建工程父票或实现切片。

原生需求澄清消费 [Context 对账](references/plan-requirements.md)；外部输入缺口消费 [问卷与恢复合同](references/external-input-questionnaire.md)。仅在本 profile 已授权的阶段范围内使用，不扩展默认阶段。

## 业务 Ticket 来源

按 `.template-spec/process/business-tickets.md` 执行 Spec 业务草案、Design 校准与业务正式化。业务票放在 `business-tickets/`，集合引用进入 Spec / map / checkpoint；业务票不授予实现资格。实现票仍在 `issues/`，受工程准备、当前 Slice 合同批准和完整就绪检查约束。 接收新能力交接时核验业务集合、规则/场景映射与原始验收；依赖未知时保守阻断范围，不无依据缩小影响。不把战略交接 approved 等同工程可实现。

<!-- HARNESS_UPGRADE_ROUTE -->
既有实例的同家族模板升级、旧身份迁移和事务恢复使用 `yss-harness-upgrade`，遵循 `.template-spec/process/harness-upgrade.md`；升级不推进阶段或改写历史批准。

<!-- SKILL_PREFLIGHT_ROUTE -->
专项技能调用前，运行 `scripts/query-lifecycle-context --work-unit <当前工作单元> --check-skills`；多运行时指定 `--agent-runtime`，条件用 `--when`。按合同 `skill_preflight` 处理缺失、漂移与冲突，在既有授权内核对补装计划、应用后重验。预检不授予执行或批准。Matt 上游为 https://github.com/mattpocock/skills，生效版本以根 `skills-lock.json` 为准。

<!-- USER_PROGRESS_REPORT -->
每轮返回或暂停按合同 `user_progress_report` 给出中文状态：当前阶段与本轮结果、下一阶段/单元与进入条件、问题/阻塞、已登记责任方、解除动作及复验、主控下一动作与用户待决定项。未知写“待核验”，负责人缺失写“未登记”；目标不代表批准，已授权工作继续执行。发送前核对证据、状态及结构化结果一致；写法见 `.template-spec/process/document-writing.md`。

专业审查按能力和独立实例执行，正式 v1 补充只读技能、当前批准、专业等待与定向复审见 [专业审查与恢复](references/professional-review.md)。
