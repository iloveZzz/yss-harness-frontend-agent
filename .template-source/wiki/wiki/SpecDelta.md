# SpecDelta

Spec Delta 记录相对既有冻结 Spec 的 ADDED / MODIFIED / REMOVED 行为、验收场景与测试映射，不代替完整 Spec、OpenAPI 或架构资产。

当前注册表保留 artifact.spec-delta，触发为已有冻结 Spec 的高风险行为变化；全新产品、全新模块与低风险调整不生成空 Delta。根据实际 UI/API/数据/风险影响恢复批准基线，保留可执行验证与回滚依据。

governed 可以从原始业务需求完成本地适用 Plan/Spec，也可以复用当前批准的本地或上游输入；冲突回交权威方，不静默改写。正式实现仍须已批准、持久化且当前的 Slice Implementation Contract、必要门禁与允许写范围。

本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。

Delta 不让正式绑定任务降级，不自行批准契约或授予实现资格。参见 [[Spec基线]]、[[影响面分诊与流程裁剪]]。

## 来源

- `AGENTS.md:52-76`：本页路由、授权及完成边界依据当前入口的 ## 5. `project-instance` 前端交付路由。
- `AGENTS.md:64-64`：governed 可从本地原始需求完成适用 Plan、业务规则和 Spec；上游批准输入先核验复用，冲突回交，阶段/Slice/门禁只用于 governed。
- `AGENTS.md:70-74`：正式路线复用当前批准输入，只推进本轮职责；API 按 Draft/审查/Freeze，四专业同一当前 Slice 合同，命中门禁不能裁剪。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `.template-spec/process/lifecycle-registry.yaml:339-342`：Spec Delta 触发为已有冻结 Spec 的高风险行为变化。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
