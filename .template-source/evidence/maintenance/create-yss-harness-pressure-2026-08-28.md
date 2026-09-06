# 压力场景 — create-yss-harness-dev 实例化契约

## 本仓

```text
scripts/verify-harness-profile-scenarios
scripts/verify-instance-distribution-scenarios
```

覆盖：错误 `profile_id`、额外产品角色、错误终止工作单元、Discovery 作为默认入口、`cli_package` 改成 `create-yss-spec`、allowlist 放行 `.template-source`、漏排除 `wiki`、放行根 `package.json`、漏渲染 `yss-project.yaml`。

结果：均按预期失败并被场景脚本断言。

## CLI 仓

`create-yss-harness-dev` 的 `npm test`（56/56）覆盖：

- 空目录 init 得到 `project-instance` 与 `.yss-harness-dev.json`
- `--dry-run` 不写盘
- attach 保留运行时与 `.git`
- 已有 `.yss-template.json` fail closed
- 空 gitlink / detached HEAD 即使 `--force` 也阻断
- ASCII locale 下 attach 门禁
- 脏路径 / 冲突备份

实例 `verify-template` 不再向 `.template-source/evidence/` 写压力 fixture。
