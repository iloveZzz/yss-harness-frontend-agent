# `create-yss-harness-dev` 实例化跨仓库契约

本文定义本仓（`yss-harness-dev-agent`，`profile_id: harness.dev-agent-slice`）与外部 `create-yss-harness-dev` CLI 之间的身份、分发面、metadata、隔离、验证和发布契约。

全生命周期 CLI `create-yss-spec` 不是本仓发布伴侣，不得初始化、接管或同步本 Harness。

## 契约目标

- 模板源仓库保留 `repository_mode: template-source`。
- CLI 创建或接管的产品仓库写入 `repository_mode: project-instance`。
- CLI 只管理分发清单声明的研发管理资产，不接管前后端运行时代码、业务目录、用户文件或 `.git`。
- `.gitmodules`、gitlink（mode `160000`）以及 `apps/` 下已挂载的实现仓工作树是用户资产；`attach` / `sync` 不得创建、覆盖或删除它们。
- 通过模板快照和 40 位 `templateCommit` 使每次初始化、升级和回滚可追踪。
- 新模板快照的实例门禁以 Node `>=22 <27` 运行；不得执行 `npm install`、`pnpm install` 或维护侧 vendor 构建。`scripts/vendor/` 必须随快照分发且可离线使用。
- 快照使用 `.template-source/distribution/template.manifest.json` 构建。未命中 allowlist 的新顶层文件默认不进入快照。

## 家族隔离

| 检测 | 行为 |
|---|---|
| 已有 `.yss-harness-dev.json` | `attach` 拒绝，提示 `sync` |
| 已有 `.yss-template.json` | 拒绝：目标属于 `create-yss-spec` 全生命周期家族 |
| `yss-project.yaml` schema / mode 非法 | 写入前阻断 |
| 合法 `template-source` | 仅显式 `attach` 可转为 `project-instance` |
| 空 gitlink / detached HEAD / submodule 挂载点 | fail closed，`--force` 也不能覆盖 |

## metadata

`.yss-harness-dev.json` 至少包含：

```json
{
  "metadataSchemaVersion": 1,
  "templateName": "create-yss-harness-dev",
  "profileId": "harness.dev-agent-slice",
  "cliVersion": "<semver>",
  "templateSource": "github:iloveZzz/yss-harness-dev-agent",
  "templateCommit": "<40-char-commit>",
  "managedFilesManifestVersion": "<manifest-hash>",
  "managedFiles": {}
}
```

不得写入 `.yss-template.json`。

## 生命周期接口

### 空目录初始化

```bash
npm create yss-harness-dev@latest
```

初始化必须把模板身份转换为 `schema_version: 1`、`repository_mode: project-instance`，渲染 `yss-project.yaml` 与 `README.md`，并执行：

```bash
scripts/sync-skills --check
scripts/update-skill-lock --check
scripts/verify-template
```

`--dry-run` 只预览，不创建目录、不删除文件。

### 已有项目 `attach`

```bash
npx create-yss-harness-dev@latest attach \
  --target-dir . \
  --project-name "项目名称" \
  --business-domain "业务领域" \
  --dry-run
npx create-yss-harness-dev@latest attach \
  --target-dir . \
  --project-name "项目名称" \
  --business-domain "业务领域" \
  --apply [--force]
```

必须显式选择 `--dry-run` 或 `--apply`。计划按 `missing`、`matched`、`conflict`、`unsafe` 分类；`--force` 只能覆盖受管 conflict。覆盖前备份到目标目录外；校验失败按操作日志回滚，metadata 不更新。

### 持续同步 `sync`

`sync` 只使用当前 CLI 包内置、绑定不可变 commit 的模板快照。运行时不拉取模板仓库。覆盖环境变量仅为开发测试：`YSS_HARNESS_TEMPLATE_REF`、`YSS_HARNESS_TEMPLATE_REPO`。正式发布不得跟随浮动 `main`。

完成后必须重新执行三个模板门禁；任一门禁失败时回滚文件变更并保持旧 metadata 版本。模板删除默认 `remove-report`，不静默删除。

`update` / `upgrade` 只升级 CLI npm 包，不同步模板资产。

## 渲染规则

| 路径 | 规则 |
|---|---|
| `yss-project.yaml` | `repository_mode: template-source` → `project-instance` |
| `README.md` | 标题改为 `--project-name`；模板源定位改为实例定位；保留 `create-yss-harness-dev` 的 `sync` 入口 |
| 项目名称 / 业务领域 / 团队规模 | 写入 `.yss-harness-dev.json` 与 README，不在 `AGENTS.md` 另开配置源 |

## 实例分发面

根规则、共享 skills / 投影、`docs/` 中的实例流程资产、共享 `scripts/`、`scripts/vendor/`、`.nvmrc` 与根 `.gitignore` 属于分发面。`.template-source/`、根 `package.json`、`.github/`、`.cursor/environment.json`、源仓库 ADR、`wiki/`、`docs/reviews/` 属于模板源资产。

`docs/process/harness-profile.yaml` 随 `docs/` 进入实例，供 Agent 识别本 Harness 家族。

## 第一版不做

- 不生成前后端运行时工程或脚手架
- 不登记实现仓库、不执行 `git submodule add`
- 不编译 Slice Implementation Contract，不替代 `harness-orchestrator`
- 不 duplicate 数字人 runtime profile / Grok Bot
- 不把战略设计交接包自动灌进实例

## 跨仓库验收

| 场景 | 必须验证 |
|---|---|
| 空目录初始化 | `project-instance`、`.yss-harness-dev.json`、固定 commit、无 `.template-source/` / `wiki/` / 根 `package.json`、三门禁通过 |
| `--dry-run` | 不写盘 |
| attach dry-run | 不写文件、不删除 `.git`，运行时代码不变 |
| attach apply | 缺失资产新增；matched 纳入 baseline；conflict 需 force；unsafe 不可 force 绕过 |
| 已有 `.yss-template.json` | 退出非 0，文件不变 |
| sync | 新增、更新、冲突和删除报告完整；force 只作用于受管文件 |
| post-sync | 三个门禁全部 fresh 通过；失败时文件和 metadata 回滚 |
| gitlink | 空 gitlink / detached HEAD 即使 `--force` 也阻断 |
| 发布包 | 固定 commit 下 `npm test` 和 `npm pack --dry-run` 通过 |

本变更只涉及模板治理和外部 CLI；frontend、backend、OpenAPI 或运行时工程为 `not-applicable`。

## 发布顺序与阻断条件

1. 本仓通过 `scripts/verify-template`，形成确定 commit。
2. CLI 用 `YSS_HARNESS_TEMPLATE_REF=<pinned-commit>` 绑定该 commit，完成 init / attach / sync 跨仓库测试和独立 review。
3. 运行固定 commit 的 `npm test`、`npm pack --dry-run`。
4. 任一仓库未通过共同验证时，不得声明整体可发布。
