import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {parseArgs} from 'node:util';
import {spawnSync} from 'node:child_process';
import {readDocument,fileBinding,digest} from '../../scripts/lib/governance-io.mjs';
import {validateCounterexample} from '../../scripts/lib/maintenance-counterexample.mjs';

const root=path.resolve(import.meta.dirname,'../..');
const helperRef='tests/scenarios/task-package-counterexample-fixture.mjs';
try {
  const {values}=parseArgs({options:{output:{type:'string'}},strict:true});
  assert.equal(values.output,'docs/.scratch/_verify-task-package/counterexamples','only the isolated task-package fixture may receive evidence');
  const destination=path.join(root,values.output);
  assert.equal(fs.existsSync(destination),false,'preserve an existing counterexample run');
  fs.mkdirSync(destination,{recursive:true});
  const inputRef=`${values.output}/lifecycle-gate.input.json`,logRef=`${values.output}/lifecycle-gate.log.json`,runRef=`${values.output}/lifecycle-gate.run.json`;
  const checkpoint=readDocument(root,'.template-spec/process/templates/lifecycle-checkpoint-template.yaml');
  const input={...checkpoint,phase_boundary:{decision:'handoff',reason:'task-package fixture: missing current handoff evidence'}};
  fs.writeFileSync(path.join(root,inputRef),JSON.stringify(input,null,2)+'\n');
  const refs=[helperRef,'scripts/verify-subagent-task-package-scenarios','scripts/verify-lifecycle-checkpoint','scripts/vendor/yaml.mjs','.template-source/process/maintenance-intensity.yaml','.template-spec/process/templates/lifecycle-checkpoint-template.yaml','.template-spec/process/schemas/lifecycle-checkpoint.schema.json','.template-spec/process/lifecycle-registry.yaml','.template-spec/agents/digital-human-roles.yaml','.agents/skills/harness-orchestrator/references/orchestration-contract.yaml',inputRef,...fs.readdirSync(path.join(root,'scripts/lib'),{recursive:true}).filter(ref=>ref.endsWith('.mjs')).map(ref=>`scripts/lib/${ref}`)];
  const inputs=[...new Set(refs)].sort().map(ref=>({ref,digest:fileBinding(root,ref)}));
  const started_at=new Date().toISOString(),command=[process.execPath,'scripts/verify-lifecycle-checkpoint',path.join(root,inputRef)];
  const actual=spawnSync(command[0],command.slice(1),{cwd:root,encoding:'utf8',timeout:30000,maxBuffer:4*1024*1024});
  assert.equal(actual.error,undefined);assert.equal(actual.status,1,`${actual.stdout}\n${actual.stderr}`);
  const expected_diagnostic="'source_ref' is a required property";
  assert.ok(`${actual.stderr}\n${actual.stdout}`.includes(expected_diagnostic),actual.stderr);
  const id='task-package-handoff-without-evidence';
  const logs=[{id,command,exit_code:actual.status,stdout:actual.stdout,stderr:actual.stderr}];
  fs.writeFileSync(path.join(root,logRef),JSON.stringify(logs,null,2)+'\n');
  const requested=[process.execPath,import.meta.filename,'--output',values.output].map(value=>JSON.stringify(value)).join(' ');
  const run={schema_version:1,kind:'maintenance-counterexample-run',trigger:'lifecycle-gate',command:requested,exit_code:0,started_at,finished_at:new Date().toISOString(),assertions:[{id,expected:'reject',actual:'rejected',expected_diagnostic}],inputs,input_digest:digest(JSON.stringify(inputs)),log:{ref:logRef,digest:fileBinding(root,logRef)}};
  fs.writeFileSync(path.join(root,runRef),JSON.stringify(run,null,2)+'\n');
  const evidence={kind:'counterexample',trigger:'lifecycle-gate',command:requested,result:'pass',run_ref:runRef};
  assert.equal(validateCounterexample(evidence,{root,trigger:'lifecycle-gate'}).status,'passed');
  process.stdout.write(JSON.stringify({verification_evidence:[evidence]})+'\n');
} catch(error) {process.stderr.write(error.message+'\n');process.exitCode=1;}
