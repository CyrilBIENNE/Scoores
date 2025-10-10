import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const dir = 'icons'
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.webp')) {
      const input = path.join(dir, file)
      const output = path.join(dir, file.replace('.webp', '.png'))
      sharp(input)
        .toFormat('png')
        .toFile(output)
        .then(() => console.info(`✅ ${file} → ${output} → ${output}`))
        .catch(console.error)
    }
  })
  fs.cpSync(dir, 'public/' +dir, { recursive: true })
}