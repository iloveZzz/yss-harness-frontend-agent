# YSS路由与合同编译

`yss-implementation-contract-compiler` 把已批准的战术设计、冻结契约和实现仓库上下文编译为 Slice Implementation Contract 草案。它不批准合同、不写业务代码、不设置 `ready-for-agent`。

进入实现时先读 `docs/process/implementation-repo-integration.md`，完成 [[实现仓库与跨仓库契约]] 登记，再编译最小 skill 集合与当前实现合同。输入缺失、未批准或 `stale` 时输出 `blocked`，交回 `harness-orchestrator`（见 [[产品研发生命周期]]）。旧入口 `yss-product-lifecycle` 已退役。

业务行为使用 `behavior-tdd`；只有机械脚手架可用 `controlled-generation`，并记录例外和验证。正式垂直切片必须消费已批准、已持久化且版本当前的 [[切片实现合同]]。合同 schema、Backend 子合同和证据字段以 `yss-implementation-contract-compiler` references 为准。

脚手架只在 `scaffold_status=required` 且受控生成合同已批准并持久化后运行。Harness 内实现路径必须落在 `apps/backend/<project>/` 或 `apps/frontend/<project>/`。技能分层由 `docs/agents/yss-skill-registry.yaml`（`status: active`）与锁文件共同约束，见 [[技能投影与锁定]]。路径越界、证据缺失、未执行验证、`drift`、`violation` 或 `new_impacts` 时停止实现并重新路由。

## 来源

- `AGENTS.md`
- `CONTEXT.md`
- `docs/process/implementation-repo-integration.md`
- `docs/agents/yss-skill-registry.yaml`
