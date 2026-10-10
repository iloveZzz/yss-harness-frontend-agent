# YSS路由与合同编译

本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。

`yss-implementation-contract-compiler` 按已批准业务资产、当前工程与影响面编译最小技能闭包和 Slice 草案；缺输入、漂移或越界交回 harness-orchestrator，不批准、不设置状态、不宣布完成。

项目实例先消费本地 `harness-orchestrator` 的 `request_triage.delivery_path`，用具备该能力的 `yss lifecycle route` 核验任务、实现仓与完整基线 SHA。daily 维护同一 Ticket/PR，绑定范围、验收、工程/基线、Skills、实际测试、独立审查与回滚，不要求阶段 checkpoint、正式 Slice 合同或多级批准；`yss lifecycle verify-daily` 失败、缺独立审查或阻断未关闭时不能完成。

技能身份、别名、能力和发现面消费 active Registry；来源、有效目录哈希与投影完整性仍由锁文件负责。共享技能由 Spec 固定来源生成；本仓只维护本端专有技能。独立克隆使用 `node scripts/prepare-skills --source <固定Spec源码目录> --apply`，再 `--check` 离线核验；共享内容、投影与来源锁按显式来源维护更新，不能分别手改。 参见 [[技能投影与锁定]]、[[切片实现合同]]。

## 来源

- `AGENTS.md:16-30`：本页路由、授权及完成边界依据当前入口的 ## 2. 单一事实来源。
- `AGENTS.md:52-76`：本页路由、授权及完成边界依据当前入口的 ## 5. `project-instance` 前端交付路由。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `AGENTS.md:24-24`：active Registry 由 Harness 编排器消费技能身份和路由；来源与投影使用 skills-lock.json。
- `AGENTS.md:54-54`：日常资格唯一消费本地 harness-orchestrator request_triage.delivery_path；lifecycle route 核验任务、实现仓和完整 SHA，政策能力或资格未证明不得启用 daily。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `AGENTS.md:90-90`：正式切片编译器只编译最小技能集与合同草案，不批准、不设置状态、不宣布完成；工程登记先核验复用。
- `AGENTS.md:42-48`：模板源在既有授权内同步 Skill、投影、锁和分发；共享源仅经显式 Spec 更新；日常定向 verification 不冒充候选或发布资格。
- `.template-spec/agents/yss-skill-registry.yaml:1-11`：active Registry 持有技能身份与发现面，编译器和本端编排器消费 canonical 技能。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
