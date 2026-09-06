# YSS DDD 生成合同同步记录

日期：2026-09-04
状态：`implementation-ready`；GitHub 分支交付不等同于正式模板或 npm release

## 强度与范围

- 强度：L3
- 触发项：`generation-semantics`、`cross-repo-contract`、`core-validator`
- 来源：`yss-spec-project-template@ec54212e2a3c3ab2f2496dc27c3979b6f2ecba03`
- 目标：`yss-harness-dev-agent` canonical skills、Harness Router 依赖合同、运行时投影与 `skills-lock.json`
- Backend runtime、Frontend runtime、OpenAPI：`not-applicable`；本轮只维护模板与生成合同，没有修改产品实现仓库。

## 维护者自检

- `yss-ddd-scaffold-generator`、`yss-domain`、`yss-dto`、`yss-repository`、`yss-web-controller` 的受影响 canonical 文件与上游来源一致。
- `yss-router` 保留 `harness-orchestrator` 审批边界，只同步静态 / 条件依赖闭包和端到端后端必需技能。
- `docs/agents/yss-skill-registry.yaml` 的调用依赖元数据与 Router closure 由校验器双向约束。
- 平台投影只由 `scripts/sync-skills` 生成，lock 只由 `scripts/update-skill-lock` 更新。

## Fresh verification

- 聚焦生成测试：32 个用例，29 通过、0 失败、3 个因缺少受控 YSS Maven 仓库环境按合同跳过。
- 技能注册表测试：13/13 通过。
- `scripts/verify-yss-dto-openapi-profile`：通过。
- `scripts/sync-skills --check`：通过。
- `scripts/update-skill-lock --check`：通过。
- `scripts/verify-template-fast`：通过。
- `scripts/verify-template`：通过。

## 未关闭边界

- 当前进程未提供受控 YSS Maven 仓库凭据，因此不得声明真实 `first-slice-verified` 或 exception starter 集成已验证。
- 未创建正式候选或独立审查记录；本记录不声明 `release-ready`，也不授权 npm publish、Git tag 或 GitHub Release。
