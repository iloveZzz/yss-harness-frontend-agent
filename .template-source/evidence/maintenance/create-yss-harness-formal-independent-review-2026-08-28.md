# 已取代的正式独立审查请求 — create-yss-harness-dev 实例化契约

## 范围

本仓：Harness Profile、分发清单、跨仓契约、入口文档解绑 `create-yss-spec`、实例安全的校验脚本。

CLI 仓：`submodules/create-yss-harness-dev`，`init` / `attach` / `sync` / `update`。

## 请审查者确认

1. 本仓发布伴侣是 `create-yss-harness-dev`，不再是 `create-yss-spec`。
2. `.yss-harness-dev.json` 与 `.yss-template.json` 家族隔离 fail closed。
3. 快照不含 `.template-source/`、根 `package.json`、`wiki/`、`.github/`。
4. CLI 不生成运行时工程、不登记实现仓库。
5. 未绑定固定模板 commit 并完成共同验证前，不得声称整体可发布。

## 实施者结论

实施者已完成 RED / GREEN / 压力场景与 CLI 56 项测试。本文件不是非实施者的正式独立审查结论。合并或 npm 发布前须由其他 Agent 或审查者改写本节。
