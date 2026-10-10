# Spec基线

Spec 记录用户问题、解决方案、用户故事、关键决策、需求、验收与测试 seam，不授予直接实现权限。稳定术语先在唯一根 Context 登记，正文、API 标识与代码按已确认词干使用。

governed 可以从原始业务需求完成本地适用 Plan/Spec，也可以复用当前批准的本地或上游输入；冲突回交权威方，不静默改写。正式实现仍须已批准、持久化且当前的 Slice Implementation Contract、必要门禁与允许写范围。

当前模板 frontmatter 默认 `stage: open`、`status: ready-for-human`、`owner: ai`，业务 Ticket 草案与 Spec 同时形成，Design 校准同组 ID。正文明确 FR/NFR/AC 对应、可观察成功/拒绝/边界/恢复、非目标和未决项；没有依据时不补造阈值或性能承诺。

只有产品设计影响才强制低保真草图、状态矩阵、H1/H2 原型交付物与确认。OpenAPI Draft 在 Freeze 前仅供评审。功能包根消费 tracker.root，当前初始化示例为 `.work/`，旧实例不因示例路径被迁移。本仓只承担前端交付；另一端角色仅提供只读输入评审，不获得另一端代码写范围。本端完成不代表跨端业务验收，统一管理方核验整体证据。 参见 [[SpecDelta]]、[[产品设计影响与原型]]。

## 来源

- `AGENTS.md:31-39`：本页路由、授权及完成边界依据当前入口的 ## 3. 语言与 Context Contract。
- `AGENTS.md:52-76`：本页路由、授权及完成边界依据当前入口的 ## 5. `project-instance` 前端交付路由。
- `AGENTS.md:34-36`：稳定术语先在唯一根 Context 登记；正式流转前对账摘要，缺失冲突或漂移阻断。
- `AGENTS.md:64-64`：governed 可从本地原始需求完成适用 Plan、业务规则和 Spec；上游批准输入先核验复用，冲突回交，阶段/Slice/门禁只用于 governed。
- `AGENTS.md:70-74`：正式路线复用当前批准输入，只推进本轮职责；API 按 Draft/审查/Freeze，四专业同一当前 Slice 合同，命中门禁不能裁剪。
- `AGENTS.md:66-68`：正式导航只推进本轮触发工作单元及依赖，生命周期本端终点为 work-unit.verification。
- `.template-spec/templates/spec-template.md:1-19`：Spec 默认 ready-for-human，业务 Ticket 草案与 Spec 同时形成。
- `.template-spec/templates/spec-template.md:51-77`：验收可观察且仅产品设计影响触发原型，Draft 不作为稳定实现合同。
- `CONTEXT.md:1-15`：根 Context 持有稳定业务语言与消费约定，正文不能授予实现权限。
- `.template-spec/process/lifecycle-registry.yaml:1-8`：active 生命周期注册表持有稳定 ID，本地执行仍受 Profile 允许范围限制。
