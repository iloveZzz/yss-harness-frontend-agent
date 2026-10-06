#!/usr/bin/env node
import assert from 'node:assert/strict';
import {validateInstanceDistribution,validateInstantiationPointers,validateDistributionManifest,loadDistributionManifest} from '../../scripts/lib/instance-distribution.mjs';
validateInstanceDistribution();
assert.throws(()=>validateInstantiationPointers({agents:'wrong'}),/初始化入口/);
assert.throws(()=>validateInstantiationPointers({readme:'npm create yss-harness-dev'}),/初始化命令/);
assert.throws(()=>validateInstantiationPointers({guide:'wrong metadata'}),/metadata/);
assert.throws(()=>validateInstantiationPointers({readme:'yss init --profile unknown --root <directory>'}),/初始化命令/);
assert.throws(()=>validateInstantiationPointers({guide:'yss init --profile unknown --root . .yss.json'}),/初始化入口|profile/);
const manifest=loadDistributionManifest();manifest.allowRootEntries.push('.template-source');
assert.throws(()=>validateDistributionManifest(manifest),/不得包含/);
process.stdout.write('专职实例分发边界场景通过\n');

assert.ok(loadDistributionManifest().excludeRootEntries.includes("tests"));
