const fs = require('fs')
const path = require('path')

const publicDir = path.resolve("public")
const outDir = path.resolve("out")

const filesToCopy = ["sw.js", "manifest.webmanifest"]
const workboxFiles = fs.readdirSync(publicDir).filter(f => f.startsWith("workbox-"))

for (const file of [...filesToCopy, ...workboxFiles]) {
  const src = path.join(publicDir, file)
  const dest = path.join(outDir, file)
  if (fs.existsSync(src)) fs.copyFileSync(src, dest)
}

console.log("✅ PWA files copied to out/")