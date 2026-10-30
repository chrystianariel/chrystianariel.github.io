export type Lang = 'pt' | 'en'

/** Um bloco de texto do case. Use os campos que fizerem sentido. */
export type CaseSection = {
  title: string
  paragraphs?: string[]
  /** Itens em destaque: label em negrito + texto */
  items?: { label: string; text: string }[]
  /** Lista simples com marcadores */
  bullets?: { label?: string; text: string }[]
  table?: { head: [string, string]; rows: [string, string][] }
  /** Números grandes em destaque */
  stats?: { value: string; label: string }[]
}

export type CaseContent = {
  name: string
  tags: string
  year: string
  /** Frase curta para a lista de trabalhos e capa */
  tagline: string
  sections: CaseSection[]
  /** Bloco "Onde a IA entrou / onde não entrou" */
  ai?: { used: string[]; human: string[] }
}

export type Dictionary = {
  nav: { work: string; about: string; contact: string; menu: string; close: string }
  hero: {
    eyebrow: string
    lines: [string, string]
    intro: string
    scroll: string
  }
  manifesto: {
    eyebrow: string
    text: string
    highlight: string
  }
  work: { eyebrow: string; title: string; view: string }
  process: {
    eyebrow: string
    title: string
    steps: { tag: string; title: string; text: string }[]
  }
  contact: { eyebrow: string; title: string; text: string; email: string; cv: string }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    experienceTitle: string
    experience: { role: string; company: string; period: string }[]
    educationTitle: string
    education: { course: string; school: string }[]
    beyondTitle: string
    beyond: string
  }
  caseUi: {
    back: string
    next: string
    role: string
    year: string
    platform: string
    aiTitle: string
    aiUsed: string
    aiHuman: string
    imagePending: string
  }
  footer: { rights: string; built: string; top: string }
  cases: Record<string, CaseContent>
}
