# Agent入口规则

每个任务先读取当前治理仓根身份与唯一 `CONTEXT.md`，按任务触发加载规则；只读调查不生成治理状态。进入独立子仓使用其本地入口，共同授权与用户工作保护仍有效。

项目实例先消费本地 `harness-orchestrator` 的 `request_triage.delivery_path`，用具备该能力的 `yss lifecycle route` 核验任务、实现仓与完整基线 SHA。daily 维护同一 Ticket/PR，绑定范围、验收、工程/基线、Skills、实际测试、独立审查与回滚，不要求阶段 checkpoint、正式 Slice 合同或多级批准；`yss lifecycle verify-daily` 失败、缺独立审查或阻断未关闭时不能完成。

governed 可以从原始业务需求完成本地适用 Plan/Spec，也可以复用当前批准的本地或上游输入；冲突回交权威方，不静默改写。正式实现仍须已批准、持久化且当前的 Slice Implementation Contract、必要门禁与允许写范围。

本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。

生命周期 ID 与条件门禁由注册表定义，影响面由裁剪文档定义，技能身份由 active Registry 定义；锁文件仍负责来源与投影。实施者不能自审，验证保存实际命令、退出码、范围与未覆盖边界。有效范围授权可复用；提交、推送、发布分别消费用户授权。参见 [[Fresh验证与独立审查]]、[[Ticket与流程状态]]。

## 来源

- `AGENTS.md:5-15`：本页路由、授权及完成边界依据当前入口的 ## 1. 仓库身份。
- `AGENTS.md:16-30`：本页路由、授权及完成边界依据当前入口的 ## 2. 单一事实来源。
- `AGENTS.md:110-120`：本页路由、授权及完成边界依据当前入口的 ## 10. 审查、验证与 Git。
- `AGENTS.md:7-14`：本仓身份独立核验；template-source 不产产品资产；只读诊断不创建 Ticket、checkpoint 或批准；旧实例显式迁移。
- `AGENTS.md:20-28`：根 Context、Profile、生命周期、影响面、Registry 与实现仓登记分别持有事实；README 不另定义规则。
- `AGENTS.md:54-54`：日常资格唯一消费本地 harness-orchestrator request_triage.delivery_path；lifecycle route 核验任务、实现仓和完整 SHA，政策能力或资格未证明不得启用 daily。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `AGENTS.md:64-64`：governed 可从本地原始需求完成适用 Plan、业务规则和 Spec；上游批准输入先核验复用，冲突回交，阶段/Slice/门禁只用于 governed。
- `AGENTS.md:70-74`：正式路线复用当前批准输入，只推进本轮职责；API 按 Draft/审查/Freeze，四专业同一当前 Slice 合同，命中门禁不能裁剪。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `AGENTS.md:112-112`：产品实现和专业审查由独立 Reviewer 执行，实施者不自审，Reviewer 不写实现；模板日常 self-check 消费维护规则。
- `AGENTS.md:118-119`：授权消费本地 harness-orchestrator user-decisions；有效范围授权复用，commit/push/publish 分别核验用户授权；返工或重要缺陷触发中文复盘。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
- `.template-spec/agents/skill-migrations.md:1-9`：技能更名与历史 Bundle 的来源独立，普通同步不自动追认旧批准。
