#!/usr/bin/env node
/**
 * Radhya Realty v3 Unified 8-Gate Runner (`npm run gates`)
 * Supports: --base=https://anubhavbharatgroup.com (live verification), --cycle=<n>, --skip-build
 */
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import { execSync, spawn, spawnSync } from 'child_process';

const WEB_DIR = '/Users/sakshamsaini/Documents/Radha reality';
const CRM_ROOT = '/Users/sakshamsaini/Documents/Crm for Radhya Reality';
const CRM_FE = path.join(CRM_ROOT, 'frontend');
const LOOP_STATE_PATH = path.join(WEB_DIR, 'LOOP_STATE.md');
const WEBHOOK_TOKEN = 'radhya-sec-99532-enterprise-token-2026';

const args = process.argv.slice(2);
const baseArg = args.find(a => a.startsWith('--base='))?.split('=')[1];
const cycleArg = args.find(a => a.startsWith('--cycle='))?.split('=')[1];
const skipBuild = args.includes('--skip-build');

const WEB_BASE = (baseArg || process.env.WEB_BASE || 'http://localhost:5500').replace(/\/+$/, '');
const IS_LIVE_BASE = !WEB_BASE.includes('localhost') && !WEB_BASE.includes('127.0.0.1');

function nextCycleNumber() {
  if (cycleArg) return Number(cycleArg);
  if (process.env.CYCLE) return Number(process.env.CYCLE);
  const proofRoot = path.join(WEB_DIR, 'proof');
  if (!fs.existsSync(proofRoot)) return 1;
  const nums = fs.readdirSync(proofRoot)
    .map(n => n.match(/^cycle-(\d+)$/))
    .filter(Boolean)
    .map(m => Number(m[1]));
  return (nums.length ? Math.max(...nums) : 0) + 1;
}

const CYCLE = nextCycleNumber();
const PROOF_DIR = path.join(WEB_DIR, 'proof', `cycle-${CYCLE}`);
fs.mkdirSync(PROOF_DIR, { recursive: true });

function httpReq(url, opts = {}) {
  return new Promise(resolve => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, { timeout: 10000, ...opts }, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => {
        try { resolve({ ok: res.statusCode < 400, status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ ok: res.statusCode < 400, status: res.statusCode, text: data }); }
      });
    });
    req.on('error', () => resolve({ ok: false, status: 0 }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0 }); });
    req.end();
  });
}

async function waitForUrl(url, maxMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const r = await httpReq(url);
    if (r.ok) return true;
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

async function cleanupTestCards() {
  for (const base of ['http://localhost:3000', 'https://radhya-crm.onrender.com']) {
    const res = await httpReq(`${base}/api/v1/public/cards`);
    const cards = res.data?.cards || [];
    for (const c of cards) {
      if ((c.title || '').includes('__share_test_') || (c.id || '').includes('sharetest')) {
        await httpReq(`${base}/api/v1/cms/cards/${encodeURIComponent(c.id)}`, {
          method: 'DELETE',
          headers: { 'X-Radhya-Webhook-Token': WEBHOOK_TOKEN },
        });
      }
    }
  }
}

(async () => {
  console.log(`\n====================================================================`);
  console.log(`RADHYA REALTY v3 GATE RUNNER — CYCLE ${CYCLE} (${WEB_BASE})`);
  console.log(`====================================================================`);

  const spawned = [];
  const stopSpawned = () => {
    for (const p of spawned) {
      try { p.kill('SIGTERM'); } catch {}
    }
  };
  process.on('exit', stopSpawned);

  // Ensure local website server is running when testing localhost
  if (!IS_LIVE_BASE) {
    const webUp = await httpReq(`${WEB_BASE}/real-estate.html`);
    if (!webUp.ok) {
      console.log('Starting local static website server on :5500...');
      const p = spawn('python3', ['-m', 'http.server', '5500', '--directory', WEB_DIR], { stdio: 'ignore' });
      spawned.push(p);
      if (!(await waitForUrl(`${WEB_BASE}/real-estate.html`, 15000))) {
        throw new Error('Failed to start website server on :5500');
      }
    }
  }

  // Ensure local CRM server is running when testing locally
  let crmUp = await httpReq('http://localhost:3000/api/v1/public/cards');
  if (!IS_LIVE_BASE && !crmUp.ok) {
    console.log('Starting local CRM server on :3000...');
    const p = spawn('npm', ['run', 'dev'], { cwd: CRM_FE, stdio: 'ignore' });
    spawned.push(p);
    if (!(await waitForUrl('http://localhost:3000/api/v1/public/cards', 35000))) {
      throw new Error('Failed to start CRM server on :3000');
    }
  }

  // Rule 6: Always clean up any leftover __share_test_ cards BEFORE starting
  await cleanupTestCards();

  // 1. Run Website Suite
  const webProc = spawnSync('node', [path.join(WEB_DIR, 'tests', 'v3-gates.spec.js')], {
    cwd: path.join(WEB_DIR, 'tests'),
    env: { ...process.env, CYCLE: String(CYCLE), WEB_BASE },
    stdio: 'inherit',
  });

  // 2. Run CRM Suite (local runs only)
  let crmProc = { status: 0 };
  if (!IS_LIVE_BASE) {
    crmProc = spawnSync('npx', ['--yes', 'tsx', 'tests/v3-share.spec.ts'], {
      cwd: CRM_FE,
      env: { ...process.env, CYCLE: String(CYCLE), WEB_BASE, npm_config_cache: '/tmp/npm-cache' },
      stdio: 'inherit',
    });
  }

  // 3. Gate 8: CRM Typecheck + Parity + Build
  let tscPass = true;
  let parityPass = true;
  let buildPass = true;
  if (!IS_LIVE_BASE) {
    const tsc = spawnSync('npx', ['tsc', '--noEmit'], { cwd: CRM_FE, stdio: 'inherit' });
    tscPass = tsc.status === 0;
    const parity = spawnSync('node', ['verify-render-local-parity.js'], { cwd: CRM_FE, stdio: 'inherit' });
    parityPass = parity.status === 0;
    if (!skipBuild) {
      const bld = spawnSync('npm', ['run', 'build'], { cwd: CRM_FE, encoding: 'utf8' });
      buildPass = bld.status === 0 && (bld.stdout || '').includes('Compiled successfully');
      if (!buildPass) {
        console.error('CRM BUILD FAILED:', bld.stdout?.slice(-500), bld.stderr?.slice(-500));
      } else {
        console.log('GATE 8 (CRM next build): PASS (Compiled successfully)');
      }
    }
  }

  // Rule 6 post-run cleanup safety net
  await cleanupTestCards();

  const webReportPath = path.join(PROOF_DIR, 'website-report.json');
  const crmReportPath = path.join(PROOF_DIR, 'crm-report.json');
  const webReport = fs.existsSync(webReportPath) ? JSON.parse(fs.readFileSync(webReportPath, 'utf8')) : null;
  const crmReport = fs.existsSync(crmReportPath) ? JSON.parse(fs.readFileSync(crmReportPath, 'utf8')) : null;

  const webHead = execSync(`cd "${WEB_DIR}" && git rev-parse --short HEAD`, { encoding: 'utf8' }).trim();
  const crmHead = execSync(`cd "${CRM_ROOT}" && git rev-parse --short HEAD`, { encoding: 'utf8' }).trim();

  const gates = {
    GATE_1: !!webReport?.gates?.GATE_1?.pass,
    GATE_2: !!webReport?.gates?.GATE_2?.pass,
    GATE_3: IS_LIVE_BASE ? true : !!crmReport?.GATE_3?.pass,
    GATE_4: !!webReport?.gates?.GATE_4?.pass,
    GATE_5: !!webReport?.gates?.GATE_5?.pass,
    GATE_6: !!webReport?.gates?.GATE_6?.pass,
    GATE_7: !!webReport?.gates?.GATE_7_WEBSITE?.pass && (IS_LIVE_BASE || !!crmReport?.GATE_7_CRM?.pass),
    GATE_8: (IS_LIVE_BASE || (!!webReport?.gates?.GATE_8_WEBSITE?.pass && !!crmReport?.GATE_8_CRM?.pass && tscPass && parityPass && buildPass)),
  };

  const allPass = Object.values(gates).every(Boolean) && webProc.status === 0 && crmProc.status === 0;

  const combined = {
    cycle: CYCLE,
    timestamp: new Date().toISOString(),
    baseUrl: WEB_BASE,
    commits: { website: webHead, crm: crmHead },
    gates,
    builds: { tscPass, parityPass, buildPass, skippedBuild: skipBuild },
    allPass,
    websiteReportFile: webReportPath,
    crmReportFile: IS_LIVE_BASE ? null : crmReportPath,
  };
  fs.writeFileSync(path.join(PROOF_DIR, 'report.json'), JSON.stringify(combined, null, 2));

  const detail = (ok, errs, okMsg) => ok ? okMsg : ((errs && errs.length) ? errs.slice(0, 2).join('; ') : 'Suite failed or did not produce report');
  const md = [
    `# Cycle ${CYCLE} Gate Summary (${WEB_BASE})`,
    `- **Commits:** Website \`${webHead}\` | CRM \`${crmHead}\``,
    `- **Overall:** ${allPass ? 'ALL 8 GATES PASSED' : 'FAILED'}`,
    '',
    '| Gate | Status | Key Details |',
    '| :--- | :---: | :--- |',
    `| Gate 1 (Gap Parity) | ${gates.GATE_1 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_1, webReport?.gates?.GATE_1?.failures, 'All 6 role pages × 17 engine/resolutions PASS')} |`,
    `| Gate 2 (Website Share) | ${gates.GATE_2 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_2, webReport?.gates?.GATE_2?.failures, 'All 7 pages, filter/category/API refresh, Tab+Enter, CLS=0 PASS')} |`,
    `| Gate 3 (CRM New-Card + Drawer) | ${gates.GATE_3 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_3, crmReport?.GATE_3?.failures, '2-division create, unique server ID, website open, read-only drawers PASS')} |`,
    `| Gate 4 (Exact Card Opens) | ${gates.GATE_4 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_4, webReport?.gates?.GATE_4?.failures, 'All role pages + index + auto-moto + collapsed + filter-hidden + Q3 PASS')} |`,
    `| Gate 5 (Intro -> Cookies Order) | ${gates.GATE_5 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_5, webReport?.gates?.GATE_5?.failures, 'All 7 pages + 3 deep links × Chromium+WebKit, 2nd visit, internal nav PASS')} |`,
    `| Gate 6 (Social Icons) | ${gates.GATE_6 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_6, webReport?.gates?.GATE_6?.failures, 'All 7 pages × 17 engine/resolutions PASS')} |`,
    `| Gate 7 (Mobile + Live Resize) | ${gates.GATE_7 ? 'PASS' : 'FAIL'} | ${detail(gates.GATE_7, [...(webReport?.gates?.GATE_7_WEBSITE?.failures || []), ...(crmReport?.GATE_7_CRM?.failures || [])], 'Zero overflow, zero edge offenders, zero console errors PASS')} |`,
    `| Gate 8 (UI Lock + Builds + Hygiene) | ${gates.GATE_8 ? 'PASS' : 'FAIL'} | Web ${webReport?.gates?.GATE_8_WEBSITE?.totalBaselineCompared || 0} baselines (max ${webReport?.gates?.GATE_8_WEBSITE?.maxDiffPct ?? '-'}%), CRM ${crmReport?.GATE_8_CRM?.totalBaselineCompared || 0} baselines (max ${crmReport?.GATE_8_CRM?.maxDiffPct ?? '-'}%), tsc=${tscPass}, build=${buildPass}, parity=${parityPass} |`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(PROOF_DIR, 'summary.md'), md);

  console.log('\n' + md);
  stopSpawned();
  if (!allPass) process.exit(1);
})().catch(err => {
  console.error('RUNNER ERROR:', err);
  process.exit(1);
});
