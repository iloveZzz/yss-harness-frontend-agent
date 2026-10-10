# 垂直切片Ticket

本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。

正式切片是贯穿受影响层、可独立验证的窄行为，不能仅按技术层拆分。切片模板初始 ready-for-human，记录用户故事、API 影响、验收、公共测试 seam、当前合同、允许写路径、阻塞关系、执行结果与完成定义。

governed 可以从原始业务需求完成本地适用 Plan/Spec，也可以复用当前批准的本地或上游输入；冲突回交权威方，不静默改写。正式实现仍须已批准、持久化且当前的 Slice Implementation Contract、必要门禁与允许写范围。

合同已批准且当前、必要门禁通过、阻塞清除并可直接实现时，编排器才可设置 ready-for-agent；编译器不能批准或改状态。业务行为采用 behavior-tdd，controlled-generation 只用于明确受控机械生成；drift/violation/new_impacts 停止受影响工作并重验。

daily 维护同一 Ticket/PR 的范围与证据，不要求正式 Slice；已有正式任务不得转成 daily。

## 来源

- `AGENTS.md:52-76`：本页路由、授权及完成边界依据当前入口的 ## 5. `project-instance` 前端交付路由。
- `AGENTS.md:77-85`：本页路由、授权及完成边界依据当前入口的 ## 6. 正式 Ticket 与状态。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `AGENTS.md:64-64`：governed 可从本地原始需求完成适用 Plan、业务规则和 Spec；上游批准输入先核验复用，冲突回交，阶段/Slice/门禁只用于 governed。
- `AGENTS.md:70-74`：正式路线复用当前批准输入，只推进本轮职责；API 按 Draft/审查/Freeze，四专业同一当前 Slice 合同，命中门禁不能裁剪。
- `AGENTS.md:81-84`：正式父 Ticket 汇总批准、阻塞和证据；Slice 必须合同已批准且当前、门禁通过、阻塞清除才能 ready-for-agent；现有当前合同核验复用，Tracker 显式选择。
- `AGENTS.md:90-90`：正式切片编译器只编译最小技能集与合同草案，不批准、不设置状态、不宣布完成；工程登记先核验复用。
- `AGENTS.md:101-101`：业务行为默认 behavior-tdd；Bug/回退先复现再 tdd，不适用时记录理由及可执行验证。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `.template-spec/templates/vertical-slice-ticket-template.md:1-20`：切片模板默认 ready-for-human，贯穿所有受影响层；Design 仅历史读取。
- `.template-spec/templates/vertical-slice-ticket-template.md:64-72`：历史模板的 Router/编译器不授 ready-for-agent；controlled-generation 仅允许机械生成，业务行为使用 behavior-tdd；Design 不在本地产出或实施此模板。
- `.template-spec/templates/vertical-slice-ticket-template.md:114-114`：drift、violation 或新影响暂停受影响工作，不能先实现再补合同；Design 仅历史读取。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
- `.template-spec/agents/issue-tracker.md:1-28`：当前 local-markdown root 为 .work，旧实例按实际 tracker.root 使用根。
- `.template-spec/agents/triage-labels.md:3-15`：Ticket 使用五态标签，不等同数字人角色或临时执行状态。
- `.template-spec/process/lifecycle-registry.yaml:1-8`：active 生命周期注册表持有稳定 ID，本地执行仍受 Profile 允许范围限制。
