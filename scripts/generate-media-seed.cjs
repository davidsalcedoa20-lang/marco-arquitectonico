const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "lib", "mediaRegistry.ts");
const migrationPath = path.join(root, "supabase", "migrations", "202610080001_site_media_admin.sql");
const source = fs.readFileSync(sourcePath, "utf8");
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const moduleShim = { exports: {} };
new Function("exports", "module", "require", output)(moduleShim.exports, moduleShim, require);
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const values = moduleShim.exports.mediaRegistry.map((item) => `(${[item.assetKey,item.section,item.label,item.altText,item.defaultUrl,item.sortOrder].map(quote).join(",")})`).join(",\n");
const seed = `insert into public.site_media_assets(asset_key, section, label, alt_text, default_url, sort_order) values\n${values}\non conflict (asset_key) do update set section=excluded.section, label=excluded.label, default_url=excluded.default_url, sort_order=excluded.sort_order;\n`;
let migration = fs.readFileSync(migrationPath, "utf8");
migration = migration.replace(/-- MEDIA_SEED_VALUES[\s\S]*$/, `-- MEDIA_SEED_VALUES\n${seed}`);
fs.writeFileSync(migrationPath, migration);
console.log(`Seeded ${moduleShim.exports.mediaRegistry.length} media records.`);
