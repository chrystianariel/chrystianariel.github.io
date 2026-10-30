import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import pt from '../content/pt'
import en from '../content/en'
import type { Dictionary, Lang } from '../content/types'

const dictionaries: Record<Lang, Dictionary> = { pt, en }
const STORAGE_KEY = 'chrys-lang'

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dictionary }

const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* storage indisponível */
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage indisponível */
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LanguageProvider>')
  return ctx
}
