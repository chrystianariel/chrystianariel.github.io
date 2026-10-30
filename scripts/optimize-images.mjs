// Converte as imagens exportadas do Figma (pasta pai) em WebP otimizado em public/images.
// Uso: npm run images  — edite a lista abaixo para adicionar novas imagens.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const SRC = resolve('..')
const OUT = resolve('public/images')

const images = [
  ['Conemo cover.png', 'conemo/cover.webp', 1600],
  ['Conemo corpo.png', 'conemo/tasks.webp', 1900],
  ['HOME - Jornadas.png', 'conemo/home.webp', 824],
  ['JORNADAS - Ansiedade - Sessões.png', 'conemo/sessions.webp', 824],
  ['TAREFA DE CASA - Situações que causam ansiedade - Lista pronta - 2.png', 'conemo/reorder.webp', 824],
  ['DrumWave cover.png', 'drumwave/cover.webp', 1350],
  ['DrumWave corpo.png', 'drumwave/flows.webp', 1900],
  ['DrumWave corpo 2.png', 'drumwave/registration.webp', 1900],
  ['TRIS - HOME MC - Amostra 1 - Em coleta - Amostra 2 Indisponível - Bronze.png', 'tris/home.webp', 824],
  ['TRIS - CALENDÁRIO MC - Ouro - 7 dias consecutivos.png', 'tris/calendar.webp', 824],
  ['TRIS - RECOMPENSAS - Extrato - Resgate solicitado.png', 'tris/rewards.webp', 824],
  ['TRIS - MC & Controle - Cadastro.png', 'tris/onboarding.webp', 1900],
  ['TRIS - WEB ADMIN - Home - Filtrar calendário.png', 'tris/admin.webp', 1440],
  ['Eu Istanbul.jpeg', 'about/chrys.webp', 1000],
]

for (const [src, out, width] of images) {
  const dest = resolve(OUT, out)
  mkdirSync(dirname(dest), { recursive: true })
  await sharp(resolve(SRC, src)).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest)
  console.log('✓', out)
}

// Capas montadas a partir de telas mobile (quando não há capa exportada do Figma)
const covers = [
  {
    out: 'tris/cover.webp',
    background: '#d6e8f8',
    phones: [
      'TRIS - CALENDÁRIO MC - Ouro - 7 dias consecutivos.png',
      'TRIS - HOME MC - Amostra 1 - Em coleta - Amostra 2 Indisponível - Bronze.png',
      'TRIS - RECOMPENSAS - Extrato - Resgate solicitado.png',
    ],
  },
]

const COVER_W = 2400
const COVER_H = 1350
const PHONE_H = 1120
const PHONE_GAP = 96

for (const { out, background, phones } of covers) {
  const meta = await sharp(resolve(SRC, phones[0])).metadata()
  const phoneW = Math.round((meta.width / meta.height) * PHONE_H)
  const radius = Math.round(phoneW * 0.09)
  const mask = Buffer.from(
    `<svg width="${phoneW}" height="${PHONE_H}"><rect width="${phoneW}" height="${PHONE_H}" rx="${radius}" ry="${radius}"/></svg>`,
  )

  const tiles = await Promise.all(
    phones.map((file) =>
      sharp(resolve(SRC, file))
        .resize({ width: phoneW, height: PHONE_H, fit: 'cover' })
        .composite([{ input: mask, blend: 'dest-in' }])
        .png()
        .toBuffer(),
    ),
  )

  // Telefone do meio sobe um pouco, como na PhoneRow do case
  const rowW = phoneW * phones.length + PHONE_GAP * (phones.length - 1)
  const left0 = Math.round((COVER_W - rowW) / 2)
  const baseTop = Math.round((COVER_H - PHONE_H) / 2)
  const middle = Math.floor(phones.length / 2)

  const dest = resolve(OUT, out)
  mkdirSync(dirname(dest), { recursive: true })
  // O sharp redimensiona antes de compor, então a composição é renderizada antes
  const canvas = await sharp({ create: { width: COVER_W, height: COVER_H, channels: 3, background } })
    .composite(
      tiles.map((input, i) => ({
        input,
        left: left0 + i * (phoneW + PHONE_GAP),
        top: i === middle ? baseTop - 48 : baseTop + 48,
      })),
    )
    .png()
    .toBuffer()
  await sharp(canvas)
    .resize({ width: 1600 })
    .webp({ quality: 82 })
    .toFile(dest)
  console.log('✓', out)
}
