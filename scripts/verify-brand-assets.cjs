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
  const images = ["finance","budget","investing","home","construction","study","math","technology","fitness","nutrition","water","planning"];
  for (const slug of images) {
    const metadata = await sharp(path.join(root,"public/images/guides/photos",slug+".webp")).metadata();
    assert.equal(metadata.width,1600,slug);
    assert.equal(metadata.height,900,slug);
  }
  console.log("PASS: exact square icon sizes and "+images.length+" licensed 1600x900 WebP guide photographs.");
}
main().catch(error => { console.error(error); process.exitCode=1; });
