const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const directory = path.resolve(__dirname, "../public/images/blog/placeholders");
  let originalBytes = 0;
  let optimizedBytes = 0;
  let count = 0;
  for (const filename of (await fs.readdir(directory)).filter(filename => filename.endsWith(".png"))) {
    const source = path.join(directory, filename);
    const destination = source.replace(/\.png$/, ".webp");
    originalBytes += (await fs.stat(source)).size;
    await sharp(source).resize(1600, 900, {fit:"cover"}).webp({quality:80}).toFile(destination);
    optimizedBytes += (await fs.stat(destination)).size;
    count += 1;
  }
  console.log(JSON.stringify({count, originalBytes, optimizedBytes, originalFilesPreserved:true}));
}
main().catch(error => {console.error(error);process.exitCode=1;});
