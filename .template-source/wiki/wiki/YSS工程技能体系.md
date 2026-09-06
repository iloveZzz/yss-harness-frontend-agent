# YSS工程技能体系

YSS skills 是本项目内置的工程规范技能，用于 DDD、UI、OpenAPI、Repository、Controller、DTO、组件和编码规范；它们不替代 [[Matt技能体系]] 的通用流程入口。

技能清单、来源、版本、哈希和投影目标以 `skills-lock.json` 为准。当前锁文件共享技能 101 个。公开发布清单 `yss-public-skills.json` 只冻结 `yss-*` 工程技能，且不再包含已退役的 `yss-product-lifecycle`。`llm-wiki` 不在该公开清单中。

词汇上的分层是：核心技能默认可发现，负责生命周期控制或通用研发入口；专项技能由 实现合同编译器 按影响面和实现合同按需选择；试验技能只在明确试验范围内使用。`docs/agents/yss-skill-registry.yaml` 记录分层、别名、默认可发现性和运行时入口，当前 `status: active`，实现合同编译器 与生命周期必须消费通过本表校验的 canonical 技能。

进入实现后，后端领域、Application、Repository / Gateway、Web / DTO 由 [[YSS路由与合同编译]] 分别路由到对应 YSS skill。领域战术设计由 `architecture-agent` 使用 `yss-tactical-design`。脚手架生成器只在 `scaffold_status=required` 且受控生成合同已批准并持久化后运行。UI 设计与原型走 `yss-design-system` 后 `yss-prototype-stage`（见 [[产品设计影响与原型]]）。

创建、修改或退役 skill 时使用 `maintaining-skills`，并按 [[模板维护流程]] 判定 L1 / L2 / L3。已退役入口见 `docs/agents/skill-migrations.md` 与 [[技能投影与锁定]]。本地持久知识库走 [[LLM Wiki]]。

## 来源

- `CONTEXT.md`
- `docs/agents/skills-maintenance.md`
- `docs/agents/yss-skill-registry.yaml`
- `skills-lock.json`
- `yss-public-skills.json`
- `docs/agents/skill-migrations.md`
