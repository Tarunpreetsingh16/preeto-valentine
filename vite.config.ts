import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function servePhotosUnderBase() {
  return {
    name: 'serve-photos-under-base',
    configureServer(server) {
      const base = '/preeto-valentine'
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith(`${base}/photos/`)) {
          const name = req.url.slice((base + '/photos/').length).split('?')[0]
          const filePath = path.join(process.cwd(), 'public', 'photos', name)
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', getMime(name))
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    },
  }
}

function getMime(filename) {
  const ext = path.extname(filename).toLowerCase()
  const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' }
  return mime[ext] || 'application/octet-stream'
}

export default defineConfig({
  plugins: [react(), servePhotosUnderBase()],
  base: '/preeto-valentine/',
})
