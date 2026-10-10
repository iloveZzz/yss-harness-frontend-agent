# OpenAPI契约

本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。

OpenAPI Draft 是 review-only，OAS 3.1 YAML 为权威合同；正式影响先 Draft、锁定工具校验、独立审查与 Freeze，再实施和契约测试。无 API 影响必须有当前依据，不能用空合同自证。

Freeze 后行为变化回到 API 影响分析与审查，不能把半成品接口或客户端当作权威。日常兼容范围以现行 delivery_path 与 yss-openapi-governance 为准，超出日常资格回正式治理。

前端消费冻结 OpenAPI；接口变化回交后端完成 Draft/审查/Freeze。本端接收预检不授予代码实施资格。 参见 [[产品设计影响与原型]]、[[切片实现合同]]。

## 来源

- `AGENTS.md:52-76`：本页路由、授权及完成边界依据当前入口的 ## 5. `project-instance` 前端交付路由。
- `AGENTS.md:129-135`：本页路由、授权及完成边界依据当前入口的 ## 13. 专职交付边界。
- `AGENTS.md:64-64`：governed 可从本地原始需求完成适用 Plan、业务规则和 Spec；上游批准输入先核验复用，冲突回交，阶段/Slice/门禁只用于 governed。
- `AGENTS.md:70-74`：正式路线复用当前批准输入，只推进本轮职责；API 按 Draft/审查/Freeze，四专业同一当前 Slice 合同，命中门禁不能裁剪。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `AGENTS.md:131-135`：前端按已登记接收路线核验：正式 API/Backend/Data 影响才要求真实后端交付，纯 UI 需当前 backend-not-applicable；接收预检不授实施资格，daily 消费第5节；只负责本端，不修改后端领域/API/数据。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
- `.template-spec/process/lifecycle-registry.yaml:1-8`：active 生命周期注册表持有稳定 ID，本地执行仍受 Profile 允许范围限制。
