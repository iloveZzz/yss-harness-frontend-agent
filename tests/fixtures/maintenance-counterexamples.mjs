// Real negative CLI execution, isolated records. Synthetic inputs never authorize a project.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parseDocument} from '../../scripts/vendor/yaml.mjs';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const hash=raw=>'sha256:'+createHash('sha256').update(raw).digest('hex');
export function counterexampleFixture(){
 const baseDir=fs.mkdtempSync(path.join(os.tmpdir(),'maintenance-counterexamples-'));
 for(const ref of ['scripts/fixtures/maintenance-review','.template-spec/agents','.template-spec/process/schemas','.template-spec/process/lifecycle-registry.yaml','.template-source/process/maintenance-intensity.yaml']){
  const dest=path.join(baseDir,ref);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.cpSync(path.join(repo,ref),dest,{recursive:true});
 }
 const input={...parseDocument(fs.readFileSync(path.join(repo,'.template-spec/process/templates/lifecycle-checkpoint-template.yaml'),'utf8')).toJS(),phase_boundary:{decision:'handoff',reason:'合成缺交接证据'}};
 const inputRef='counterexample.input.json';fs.writeFileSync(path.join(baseDir,inputRef),JSON.stringify(input));
 const command=[process.execPath,path.join(repo,'scripts/verify-lifecycle-checkpoint'),path.join(baseDir,inputRef)];
 const started_at=new Date().toISOString(),out=spawnSync(command[0],command.slice(1),{cwd:repo,encoding:'utf8'}),finished_at=new Date().toISOString();
 const diagnostic="'source_ref' is a required property";
 if(out.error||out.status!==1||!(out.stdout+out.stderr).includes(diagnostic))throw new Error('counterexample unexpected: '+out.stdout+out.stderr);
 const logRef='counterexample.log.json',runRef='counterexample.run.json';
 fs.writeFileSync(path.join(baseDir,logRef),JSON.stringify([{id:'handoff-without-evidence',command,exit_code:out.status,stdout:out.stdout,stderr:out.stderr}]));
 const code=['scripts/verify-lifecycle-checkpoint',...fs.readdirSync(path.join(repo,'scripts/lib')).filter(x=>x.endsWith('.mjs')).map(x=>'scripts/lib/'+x),'scripts/vendor/yaml.mjs','.template-spec/process/lifecycle-registry.yaml','.template-spec/process/schemas/lifecycle-checkpoint.schema.json','tests/fixtures/maintenance-counterexamples.mjs'];
 for(const ref of code){const dst=path.join(baseDir,ref);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(path.join(repo,ref),dst);}
 const inputs=[inputRef,...code].sort().map(ref=>({ref,digest:hash(fs.readFileSync(path.join(baseDir,ref)))}));
 const evidenceCommand='node tests/fixtures/maintenance-counterexamples.mjs (real handoff rejection)';
 const record={schema_version:1,kind:'maintenance-counterexample-run',trigger:'lifecycle-gate',command:evidenceCommand,exit_code:0,started_at,finished_at,inputs,input_digest:hash(JSON.stringify(inputs)),log:{ref:logRef,digest:hash(fs.readFileSync(path.join(baseDir,logRef)))},assertions:[{id:'handoff-without-evidence',expected:'reject',actual:'rejected',expected_diagnostic:diagnostic}]};
 fs.writeFileSync(path.join(baseDir,runRef),JSON.stringify(record));
 process.stdout.write(JSON.stringify({counterexample_run:record,actual_execution:JSON.parse(fs.readFileSync(path.join(baseDir,logRef),'utf8'))})+'\n');
 process.on('exit',()=>fs.rmSync(baseDir,{recursive:true,force:true}));
 return {baseDir,evidence:{kind:'counterexample',trigger:'lifecycle-gate',command:evidenceCommand,result:'pass',run_ref:runRef},record};
}
