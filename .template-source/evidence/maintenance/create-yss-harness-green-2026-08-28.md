# GREEN — create-yss-harness-dev 实例化契约

补齐 Profile、分发清单、跨仓契约并改写入口指针后的验证。

## scripts/verify-harness-profile

```
Harness profile 校验通过: harness.dev-agent-slice → create-yss-harness-dev
exit=0
```

## scripts/verify-instance-distribution

```
实例分发面校验通过: create-yss-harness-dev / .yss-harness-dev.json
exit=0
```

## scripts/verify-harness-profile-scenarios / verify-instance-distribution-scenarios

```
Harness profile 压力场景验证通过
实例分发面压力场景验证通过
```

`scripts/verify-template` 已于本轮独立执行，退出码 0，输出以终端记录为准。
