import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {ROOT} from '../../../../scripts/lib/skill-supply-chain.mjs';
import {validateWireProfileSource} from '../../../../scripts/lib/openapi-wire-source.mjs';

test('wire snapshot is bound to a source revision and rejects byte drift or invalid provenance',()=>{
  const root=mkdtempSync(path.join(tmpdir(),'wire-profile-'));
  const relative='.agents/skills/yss-openapi-governance/references';
  const dir=path.join(root,relative);mkdirSync(dir,{recursive:true});
  const profile=readFileSync(path.join(ROOT,relative,'openapi-wire-profile.yaml'));
  const metadata=readFileSync(path.join(ROOT,relative,'openapi-wire-source.json'),'utf8');
  try {
    writeFileSync(path.join(dir,'openapi-wire-profile.yaml'),profile);
    writeFileSync(path.join(dir,'openapi-wire-source.json'),metadata);
    assert.equal(validateWireProfileSource({root}).verification,'offline-snapshot');
    writeFileSync(path.join(dir,'openapi-wire-profile.yaml'),Buffer.concat([profile,Buffer.from('\n# drift\n')]));
    assert.throws(()=>validateWireProfileSource({root}),/摘要不一致/);
    writeFileSync(path.join(dir,'openapi-wire-profile.yaml'),profile);
    for(const [field,value,pattern] of [['revision','HEAD',/完整源版本/],['path','../escape',/源路径非法/],['sha256','unknown',/SHA-256/]]) {
      writeFileSync(path.join(dir,'openapi-wire-source.json'),JSON.stringify({...JSON.parse(metadata),[field]:value}));
      assert.throws(()=>validateWireProfileSource({root}),pattern);
    }
  } finally {rmSync(root,{recursive:true,force:true});}
});
