# Harness 工作单元地图

<!-- lifecycle-registry:work-units:start -->
> 此表由 `docs/process/lifecycle-registry.yaml` 生成；工作单元按 `scope` 区分模板维护与项目实例流程。

| 稳定 ID | 范围 | 工作单元 | 输入 | 输出 | 完成条件 |
|---|---|---|---|---|---|
| `work-unit.harness-entry` | project-instance | Harness 入口校验 | yss-project.yaml、CONTEXT.md 和已确认的上游输入。 | 影响面、仓库上下文和上游输入证据。 | 身份、输入版本和写入边界可解释。 |
| `work-unit.slice-contract` | project-instance | Slice Contract 编译与批准 | 当前上游资产、前端工程设计、条件化 Backend Delivery、API / 数据 / UI 影响和实现仓库登记。 | 当前版本 Slice Implementation Contract 和四角色任务包草案。 | 合同通过校验并满足 ready-for-agent 公式。 |
| `work-unit.slice-implementation` | project-instance | 垂直切片实现 | 已批准且版本当前的 Slice Implementation Contract。 | 前端、后端和测试实现及 YSS Skill Execution Result。 | 行为测试、工程验证、契约一致性和写入边界全部满足。 |
| `work-unit.verification` | project-instance | 独立验证 | 实现候选、合同、验收标准和测试 seam。 | Fresh Verification、Review 结果和 checkpoint。 | 测试 Agent 独立验证通过，且无阻塞信号。 |
| `work-unit.ssot-update` | template-source | Harness 权威资产更新 | 模板维护变更合同。 | 权威文档、schema、脚本或技能。 | 权威资产可被校验器读取。 |
| `work-unit.skill-projection-sync` | template-source | 技能投影同步 | .agents/skills 和 skills-lock.json。 | 各 Agent runtime root 的同步投影。 | scripts/sync-skills --check 通过。 |
| `work-unit.intensity-aware-verification` | template-source | 分级 Fresh Verification | 变更仓库、维护强度和最低证据。 | 校验命令输出与维护证据。 | 命中等级的结构、行为和压力验证通过。 |
| `work-unit.intensity-aware-review` | template-source | 分级独立审查 | 变更 diff、维护强度和验证证据。 | self-check、聚焦审查或正式独立审查结论。 | 没有未处理阻断项。 |
| `work-unit.release-and-rollback` | template-source | Harness Checkpoint 与回滚 | 已审查模板资产。 | Checkpoint、回滚点和发布说明。 | 变更边界和恢复动作可追溯。 |
| `work-unit.frontend-engineering-design` | project-instance | 前端工程设计 | 当前战略与后端联合接收结果、视觉基线、真实接口和实现仓约束。 | 前端工程设计、frontend_implementation_plan 草案与可执行验收用例。 | 输入仍然有效，设计可审阅且可进入前端 Slice Contract 准备；不放行代码实现。 |
<!-- lifecycle-registry:work-units:end -->
