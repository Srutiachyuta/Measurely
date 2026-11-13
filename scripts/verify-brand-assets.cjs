const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");

async function main() {
  const icons = {"favicon-16x16.png":16,"favicon-32x32.png":32,"favicon-48x48.png":48,"favicon-64x64.png":64,"apple-touch-icon.png":180,"icon-96.png":96,"icon-192.png":192,"icon-512.png":512,"brand/measurely-logo-v2.png":512};
  for (const [file, size] of Object.entries(icons)) {
    const image = await sharp(path.join(root,"public",file)).metadata();
    assert.equal(image.width,size,file);
    assert.equal(image.height,size,file);
  }
  const images = JSON.parse(fs.readFileSync(path.join(root,"src/data/article-image-manifest.json"),"utf8"));
  for (const [slug, image] of Object.entries(images)) {
    const metadata = await sharp(path.join(root,"public",image.src)).metadata();
    assert.equal(metadata.width,1600,slug);
    assert.equal(metadata.height,900,slug);
    assert.ok(image.alt.length>30,slug);
    assert.ok(!image.alt.includes("Featured image for blog"),slug);
  }
  assert.ok(!images["tax-saving-tips-2026"]);
  console.log("PASS: exact square icon sizes and "+Object.keys(images).length+" article-specific 1600x900 WebP images.");
}
main().catch(error => { console.error(error); process.exitCode=1; });
