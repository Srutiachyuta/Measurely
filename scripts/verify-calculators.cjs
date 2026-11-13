const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const cache = new Map();
function load(filename) {
  const resolved = [filename, filename + ".ts", filename + ".tsx", filename + ".json", path.join(filename, "index.ts")].find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!resolved) throw new Error("Module not found: " + filename);
  if (resolved.endsWith(".json")) return JSON.parse(fs.readFileSync(resolved, "utf8"));
  if (cache.has(resolved)) return cache.get(resolved).exports;
  const loadedModule = { exports: {} };
  cache.set(resolved, loadedModule);
  const source = ts.transpileModule(fs.readFileSync(resolved, "utf8"), { compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true} }).outputText;
  const requireModule = specifier => {
    if (specifier === "lucide-react") return new Proxy({}, {get: (_, name) => Object.assign(() => null, {displayName: name})});
    if (specifier === "server-only") return {};
    if (specifier === "next/headers") return {cookies: async () => ({get: () => undefined})};
    if (specifier === "next/server") return {NextResponse: {json: (body, options = {}) => ({body, status: options.status ?? 200})}};
    if (specifier.startsWith("node:")) return require(specifier);
    if (specifier.startsWith("@/")) return load(path.join(root, "src", specifier.slice(2)));
    if (specifier.startsWith(".")) return load(path.join(path.dirname(resolved), specifier));
    throw new Error("Unexpected import: " + specifier);
  };
  vm.runInThisContext("(function(require,module,exports){" + source + "\n})", {filename: resolved})(requireModule, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

async function main() {
  const tools = load(path.join(root, "src/data/calculators")).calculators;
  const find = slug => tools.find(tool => tool.slug === slug);
  const value = (slug, inputs, key) => find(slug).compute({...Object.fromEntries(find(slug).inputs.map(input => [input.key,input.defaultValue ?? ""])),...find(slug).example.inputs,...inputs}).find(result => result.key === key)?.value;
  for (const tool of tools) {
    const inputs = {...Object.fromEntries(tool.inputs.map(input => [input.key, input.defaultValue ?? ""])), ...tool.example.inputs};
    const results = tool.compute(inputs);
    assert.ok(results.length > 0, tool.slug + " returns no example outputs");
    for (const result of results) if (typeof result.value === "number") assert.ok(Number.isFinite(result.value), tool.slug + ": " + result.key);
    for (const input of tool.inputs.filter(input => input.type === "number" && input.min === 0)) {
      for (const result of tool.compute({...inputs, [input.key]: 0})) if (typeof result.value === "number") assert.ok(Number.isFinite(result.value), tool.slug + " zero " + input.key);
    }
  }
  assert.equal(value("emi-calculator", {loanAmount: 12000, interestRate: 0, tenure: 12, tenureType: "months"}, "emi"), 1000);
  assert.equal(value("loan-calculator", {loanAmount: 1000, interestRate: 12, loanTerm: 12, termType: "months"}, "monthlyPayment"), 88.85);
  assert.equal(value("sip-calculator", {monthlyInvestment: 1000, expectedReturn: 0, tenure: 1, tenureType: "years"}, "maturityValue"), 12000);
  const math = load(path.join(root, "src/lib/math-expression"));
  const configSource = ts.transpileModule(fs.readFileSync(path.join(root,"next.config.ts"),"utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const readConfig = env => {
    const exports = {};
    vm.runInNewContext(configSource, {exports,process:{env},require:name=>{assert.equal(name,"@next/bundle-analyzer");return ()=>config=>config;}});
    return exports.default;
  };
  const longSha="407984f933536b50e2076cc070b431f89fad1caf";
  assert.equal(readConfig({VERCEL_GIT_COMMIT_SHA:longSha}).deploymentId,longSha.slice(0,32));
  assert.equal(readConfig({GITHUB_SHA:longSha}).deploymentId.length,32);
  assert.equal(readConfig({NEXT_DEPLOYMENT_ID:"custom-id",VERCEL_GIT_COMMIT_SHA:longSha}).deploymentId,"custom-id");
  assert.equal(readConfig({NEXT_DEPLOYMENT_ID:"x".repeat(100)}).deploymentId.length,32);
  assert.equal(readConfig({}).deploymentId,undefined);
  const hostingConfig=JSON.parse(fs.readFileSync(path.join(root,"vercel.json"),"utf8"));
  assert.equal(hostingConfig.installCommand,"npm ci");
  assert.equal(hostingConfig.buildCommand,"npm run build");
  const workerHandlers = new Map();
  const deletedCaches = [];
  vm.runInNewContext(fs.readFileSync(path.join(root,"public/sw.js"),"utf8"), {
    self: {addEventListener:(name,handler)=>workerHandlers.set(name,handler),skipWaiting:async()=>{},clients:{claim:async()=>{}}},
    caches: {keys:async()=>["measurely-v1","measurely-old","other-app-cache"],delete:async name=>{deletedCaches.push(name);return true;}}
  });
  assert.ok(!workerHandlers.has("fetch"),"Retired worker must never cache navigation or API responses");
  let workerReady;
  workerHandlers.get("activate")({waitUntil:promise=>{workerReady=promise;}});
  await workerReady;
  assert.deepEqual(deletedCaches,["measurely-v1","measurely-old"]);
  const units = load(path.join(root, "src/data/unit-converter"));
  assert.equal(units.convertUnit(1,"length","ft","in"),12);
  assert.equal(units.convertUnit(1,"length","mi","m"),1609.344);
  assert.equal(units.convertUnit(1,"mass","lb","kg"),0.45359237);
  assert.equal(units.convertUnit(1,"area","acre","m²"),4046.8564224);
  assert.equal(units.convertUnit(1,"volume","L","mL"),1000);
  assert.equal(units.convertUnit(36,"speed","km/h","m/s"),10);
  assert.equal(units.convertUnit(0,"temperature","°C","°F"),32);
  assert.equal(units.convertUnit(-40,"temperature","°F","°C"),-40);
  assert.equal(units.convertUnit(0,"temperature","K","°C"),-273.15);
  assert.equal(units.convertUnit(0,"mass","kg","lb"),0);
  for (const [group, {units: options}] of Object.entries(units.UNIT_GROUPS)) {
    for (const from of options) for (const to of options) {
      const converted=units.convertUnit(100,group,from.value,to.value);
      const roundTrip=units.convertUnit(converted,group,to.value,from.value);
      assert.ok(Math.abs(roundTrip-100)<1e-7,`Unit round trip: ${group}, ${from.value}, ${to.value}`);
    }
  }
  assert.throws(()=>units.convertUnit(1,"length","kg","m"));
  assert.throws(()=>units.convertUnit(-1,"mass","kg","lb"));
  assert.throws(()=>units.convertUnit(-1,"temperature","K","°C"));
  assert.throws(()=>units.convertUnit(Infinity,"length","m","ft"));
  assert.throws(()=>units.convertUnit(Number.MAX_VALUE,"length","km","cm"));
  assert.ok(!tools.some(tool=>tool.slug==="watt-calculator"));
  assert.ok(tools.some(tool=>tool.slug==="unit-converter"));
  assert.equal(value("power-calculator", {power:"",voltage:12,current:2,resistance:""}, "power"),24);
  assert.throws(()=>find("power-calculator").compute({power:24,voltage:12,current:3,resistance:""}));
  assert.equal(math.evaluateExpression("2^3^2"), 512);
  assert.equal(math.evaluateExpression("-2^2"), -4);
  assert.equal(math.evaluateExpression("sin(30)", true), 0.5);
  assert.equal(math.evaluateExpression("fact(5)+sqrt(9)"), 123);
  assert.throws(() => math.evaluateExpression("1/0"));
  assert.throws(() => math.evaluateExpression("process.exit()"));
  assert.throws(() => math.evaluateExpression("sqrt(-1)"));
  assert.equal(math.matrixCalculation("[[1,2],[3,4]]", "[[5,6],[7,8]]", 2, "multiply"), "[ 19, 22 ] ; [ 43, 50 ]");
  assert.throws(() => math.matrixCalculation("[[1]]", "[[1]]", 2, "add"));
  assert.equal(math.matrixCalculation('[["-1","2"],["3","4"]]', '[["5","6"],["7","8"]]', 2, "add"), "[ 4, 8 ] ; [ 10, 12 ]");
  assert.throws(() => math.matrixCalculation('[["",2],[3,4]]', "[[1,2],[3,4]]", 2, "add"));
  const finance = load(path.join(root, "src/lib/finance-math"));
  assert.equal(finance.annuityValue(1000,0,12,true),12000);
  const tax = load(path.join(root, "src/lib/india-tax"));
  assert.equal(tax.indianSalaryTax(1275000,"new").tax,0);
  assert.equal(tax.indianSalaryTax(1675000,"new").tax,120000);
  assert.equal(tax.indianSalaryTax(575000,"old").tax,17500);
  assert.throws(() => tax.indianSalaryTax(5000001,"new"));
  const auth = load(path.join(root, "src/cms/lib/server-auth"));
  const originalPassword = process.env.CMS_PASSWORD;
  const originalSecret = process.env.CMS_SESSION_SECRET;
  try {
    process.env.CMS_PASSWORD = "test-only-" + require("node:crypto").randomBytes(24).toString("hex");
    process.env.CMS_SESSION_SECRET = require("node:crypto").randomBytes(32).toString("hex");
    assert.equal(auth.validPassword(process.env.CMS_PASSWORD),true);
    assert.equal(auth.validPassword("admin123"),false);
    const session = auth.createSession();
    assert.equal(auth.validSession(session),true);
    assert.equal(auth.validSession(session + "tampered"),false);
    process.env.CMS_PASSWORD += "rotated";
    assert.equal(auth.validSession(session),false);
    assert.equal((await auth.requireCms()).status,401);
    assert.equal(auth.sameOrigin(new Request("https://example.com/api/cms/data", {method:"POST",headers:{origin:"https://evil.example"}})),false);
    delete process.env.CMS_PASSWORD;
    assert.equal((await auth.requireCms()).status,503);
  } finally {
    if (originalPassword === undefined) delete process.env.CMS_PASSWORD; else process.env.CMS_PASSWORD = originalPassword;
    if (originalSecret === undefined) delete process.env.CMS_SESSION_SECRET; else process.env.CMS_SESSION_SECRET = originalSecret;
  }
  const sitemap = load(path.join(root,"src/app/sitemap")).default();
  assert.equal(new Set(sitemap.map(entry=>entry.url)).size,sitemap.length);
  assert.equal(sitemap.some(entry=>entry.url.endsWith("/search")),false);
  const robots = load(path.join(root,"src/app/robots")).default();
  assert.equal(JSON.stringify(robots).includes("/_next/"),false);
  console.log(`PASS: ${tools.length} example computations, allowed-zero checks, numerical references, scientific/matrix validation, session security and sitemap/robots checks.`);
}
main().catch(error => {console.error(error);process.exitCode=1;});
