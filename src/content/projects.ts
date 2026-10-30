// Metadados visuais dos projetos (não traduzíveis). O texto fica em pt.ts / en.ts.
// Para adicionar imagens: exporte do Figma, adicione em scripts/optimize-images.mjs,
// rode `npm run images` e liste o caminho aqui.

export type ProjectImage = {
  src: string
  alt: { pt: string; en: string }
  /** 'wide' ocupa a largura toda; 'phone' é uma tela mobile estreita */
  kind: 'wide' | 'phone'
}

export type Project = {
  slug: string
  /** Cor de fundo da capa / preview */
  color: string
  cover?: string
  role: { pt: string; en: string }
  platform: { pt: string; en: string }
  gallery: ProjectImage[]
}

export const projects: Project[] = [
  {
    slug: 'conemo',
    color: '#cfc0ff',
    cover: '/images/conemo/cover.webp',
    role: { pt: 'Product Designer', en: 'Product Designer' },
    platform: { pt: 'App mobile + Web admin', en: 'Mobile app + Web admin' },
    gallery: [
      { src: '/images/conemo/home.webp', kind: 'phone', alt: { pt: 'Home com as jornadas Depressão, Ansiedade e Insônia', en: 'Home with Depression, Anxiety and Insomnia journeys' } },
      { src: '/images/conemo/sessions.webp', kind: 'phone', alt: { pt: 'Mapa de sessões da jornada de Ansiedade', en: 'Session map for the Anxiety journey' } },
      { src: '/images/conemo/reorder.webp', kind: 'phone', alt: { pt: 'Lista reordenável de situações que causam ansiedade', en: 'Reorderable list of anxiety-causing situations' } },
      { src: '/images/conemo/tasks.webp', kind: 'wide', alt: { pt: 'Fluxo da tarefa de casa com escala de ansiedade de 0 a 10', en: 'Homework flow with a 0–10 anxiety scale' } },
    ],
  },
  {
    slug: 'drumwave',
    color: '#1d1a6b',
    cover: '/images/drumwave/cover.webp',
    role: { pt: 'Product Designer', en: 'Product Designer' },
    platform: { pt: 'Plataforma web (desktop, tablet e mobile)', en: 'Web platform (desktop, tablet & mobile)' },
    gallery: [
      { src: '/images/drumwave/registration.webp', kind: 'wide', alt: { pt: 'Telas de cadastro e definição de senha da Data Reserve', en: 'Data Reserve sign-up and password screens' } },
      { src: '/images/drumwave/flows.webp', kind: 'wide', alt: { pt: 'Mapa de fluxos: home, cadastro, login e seleção de país', en: 'Flow map: home, registration, login and country selection' } },
    ],
  },
  {
    slug: 'tris',
    color: '#1059b5',
    cover: '/images/tris/cover.webp',
    role: { pt: 'Product Designer', en: 'Product Designer' },
    platform: { pt: 'App mobile + Web admin', en: 'Mobile app + Web admin' },
    gallery: [
      { src: '/images/tris/home.webp', kind: 'phone', alt: { pt: 'Home com coleta de amostra em andamento e medalha de bronze', en: 'Home with a sample collection in progress and a bronze medal' } },
      { src: '/images/tris/calendar.webp', kind: 'phone', alt: { pt: 'Calendário de amostras com a medalha de ouro', en: 'Sample calendar with the gold medal' } },
      { src: '/images/tris/rewards.webp', kind: 'phone', alt: { pt: 'Saldo e extrato de recompensas', en: 'Rewards balance and statement' } },
      { src: '/images/tris/onboarding.webp', kind: 'wide', alt: { pt: 'Fluxo de cadastro da foto do participante, usada para validar cada amostra', en: 'Participant photo registration flow, used to validate every sample' } },
      { src: '/images/tris/admin.webp', kind: 'wide', alt: { pt: 'Web admin: validação de amostras por participante e data', en: 'Web admin: sample validation by participant and date' } },
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
