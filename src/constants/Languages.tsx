export const languages = {
  en: { label: 'English', icon: '/language_icons/gb.svg' },
  de: { label: 'German', icon: '/language_icons/de.svg' },
  es: { label: 'Spanish', icon: '/language_icons/es.svg' },
  tr: { label: 'Turkish', icon: '/language_icons/tr.svg' },
} as const

export type LanguageCode = keyof typeof languages
