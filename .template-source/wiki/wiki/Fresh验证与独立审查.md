# Fresh验证与独立审查

Fresh Verification 证明当前任务范围、资产和触发合同的真实行为，不等于全仓全套检查。记录实际命令、退出码、范围和未覆盖项；过去跑过或实现者自报不能作为当前完成证据。

同一边界的输入字节、校验器/schema、命令参数与仓根未变时可以复用实际证据；变化只使受影响依赖失效。恢复、handoff 与正式边界重新核验当前性，未知则重跑适用检查；修复后按差异、受影响结论和依赖定向复审。

产品实现和命中的专业审查由独立 Reviewer 执行，实施者不得自审；daily 也要求独立 code-review。模板日常维护按适用 L1/L2/L3 留证，自检默认出口 implementation-ready，强度不自动触发候选冻结或独立审查。

推荐 Domain/Application >=90%、API >=80%、前端组件 >=75%、已定义关键流程 100% E2E；只有项目明确采纳才成为 CI 门禁，未定义关键流程不能声称 100% E2E。

前端验证优先 `pnpm`；后端领域模型只读消费，API、数据和后端实现变化回交后端；前端工程使用 YSS 前端生成器。 本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。

## 来源

- `AGENTS.md:110-120`：本页路由、授权及完成边界依据当前入口的 ## 10. 审查、验证与 Git。
- `AGENTS.md:125-128`：本页路由、授权及完成边界依据当前入口的 ## 12. 测试质量基线。
- `AGENTS.md:112-112`：产品实现和专业审查由独立 Reviewer 执行，实施者不自审，Reviewer 不写实现；模板日常 self-check 消费维护规则。
- `AGENTS.md:113-114`：Fresh Verification 只跑当前范围及依赖；证据保存命令/退出码/边界，输入/schema/参数/仓根不变才复用，正式边界重验，局部完成不等于整体完成。
- `AGENTS.md:58-58`：daily 只更新同一 Ticket/PR 并保留范围、验收、工程基线、Skills、实际测试、独立审查和回滚；无需阶段 checkpoint 或正式 Slice；verify-daily 失败、缺独立审查或阻断未关闭不能完成。
- `AGENTS.md:60-60`：已有正式绑定任务不得降级；无关正式资产不阻断 daily；新排除风险保留证据并恢复 governed，超出兼容范围的 API 走正式 Draft、审查和 Freeze。
- `AGENTS.md:127-127`：覆盖率数字是推荐基线，只有项目测试策略采纳才成为 CI 门禁；未定义关键流程不能宣称100% E2E。
- `AGENTS.md:94-94`：本端验证优先 pnpm。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `.template-spec/process/harness-process-tailoring.md:1-16`：裁剪按实际影响与最近可信阶段，正式业务实现要求当前 Slice；所有路径遵守写范围。
- `.template-source/process/maintenance-intensity.yaml:1-29`：强度按 L1/L2/L3 的已登记 trigger 判定，默认 L2，不定义独立审查授权。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
