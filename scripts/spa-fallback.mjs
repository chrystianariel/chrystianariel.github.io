// Prepara o dist para o GitHub Pages (roda no predeploy).
// - 404.html: o Pages não tem rewrites, então rotas como /work/conemo caem no 404
//   e servem o próprio app; o React Router resolve a página.
// - .nojekyll: impede o Jekyll de processar os arquivos.
import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve('dist')

copyFileSync(resolve(DIST, 'index.html'), resolve(DIST, '404.html'))
writeFileSync(resolve(DIST, '.nojekyll'), '')
console.log('✓ 404.html e .nojekyll')
