# Spec基线

Spec 是记录用户问题、解决方案、用户故事、关键决策、验收标准和测试 seam 的产品研发规格。新资产统一使用 Spec。它是 [[产品研发生命周期]] 进入 Harness 前必须版本当前的上游输入，不是可以直接编码的 Ticket。

当前分支从已批准的上游 Spec / 战略设计进入 `harness-entry`。`grill-with-docs` 与 `to-spec` 只是用户显式兼容入口，不能代替 `harness-orchestrator`。Spec 初稿使用 `ready-for-human`；下游实现仍须通过必要门禁后才能 `ready-for-agent`。旧入口 `yss-product-lifecycle` 已退役。

模板 `docs/templates/spec-template.md` 仍是 Spec 正文骨架。Local 路径约定为 `docs/.scratch/<feature>/spec.md`，父 Ticket 为 `docs/.scratch/<feature>/parent-ticket.md`。验收标准写可观察结果。业务术语必须先在 `CONTEXT.md` 登记 PascalCase `英文标识`。领域行为落地由 `architecture-agent` 使用 `yss-tactical-design` 形成 Tactical Design Contract，而不是在 Spec 阶段静默定义聚合。

存在 UI 影响时才强制低保真草图、状态矩阵、高保真原型和用户确认；否则记录 `not-applicable`。UI 影响不等于 [[产品设计影响与原型]]。OpenAPI 影响在 Spec 中先勾选无影响或需要 Draft；Draft 在 Freeze 前只供评审，见 [[OpenAPI契约]]。相对既有冻结基线的高风险行为差异才写 [[SpecDelta]]。冻结后的 Spec 是 [[垂直切片Ticket]] 与 [[切片实现合同]] 的输入。

## 来源

- `CONTEXT.md`
- `AGENTS.md`
- `docs/templates/spec-template.md`
- `docs/process/lifecycle-registry.yaml`
