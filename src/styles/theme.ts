export const theme = {
  // -------------------------
  // Cores
  // -------------------------
  fonts: {
    bombType: 'BombFont',
  },

  colors: {
    black: '#000000',
    white: '#ffffff',
    'primary-a0': '#ebde94',
    'primary-a10': '#eee2a0',
    'primary-a20': '#f0e5ac',
    'primary-a40': '#f5ecc3',
    'surface-a0': '#212121',
    'surface-a10': '#363636',
    'surface-a20': '#4c4c4c',
    'surface-a30': '#636363',
    'surface-a40': '#7b7b7b',
    'surface-a50': '#949494',
    'surface-a60': '#aeaeae',
    'surface-a70': '#c8c8c8',
    'surface-tonal-a0': '#32312b',
    'surface-tonal-a10': '#46453f',
    'surface-tonal-a20': '#5a5954',
    'surface-tonal-a30': '#706f6b',
    'surface-tonal-a40': '#868682',
    'surface-tonal-a50': '#9d9d99',
    'surface-tonal-a60': '#b5b4b2',
    'surface-tonal-a70': '#cdcdcb',
    'success-a0': '#22946e',
    'success-a10': '#47d5a6',
    'success-a20': '#9ae8ce',
    'warning-a0': '#a87a2a',
    'warning-a10': '#d7ac61',
    'warning-a20': '#ecd7b2',
    'danger-a0': '#9c2121',
    'danger-a10': '#d94a4a',
    'danger-a20': '#eb9e9e',
    'info-a0': '#21498a',
    'info-a10': '#4077d1',
    'info-a20': '#92b2e5',
    text: '#ffffff', // cor padrão de texto
    'ctside': '#9bb8be',
    'tside': '#b9a96e',
  },

  // -------------------------
  // Espaçamentos
  // -------------------------
  space: {
    '2xs': '4px',   // Espaços sutis, ícones e texto
    xs: '8px',      // Pequenos paddings
    sm: '12px',     // Espaços entre elementos pequenos
    md: '16px',     // Espaçamento padrão de cards
    lg: '24px',     // Separações entre seções
    xl: '32px',     // Margens grandes
    '2xl': '48px',  // Layouts amplos, cabeçalhos
    '3xl': '64px',  // Seções hero, blocos de destaque
  },

  // -------------------------
  // Border Radius
  // -------------------------
  radius: {
    sm: '4px',      // Inputs, botões pequenos
    md: '8px',      // Cards, containers médios
    lg: '12px',     // Modais, imagens
    full: '9999px', // Botões arredondados, avatares
  },

  // -------------------------
  // Opacidade
  // -------------------------
  opacity: {
    50: 0.5,
    80: 0.8,
  },

  // -------------------------
  // Tipografia
  // -------------------------
  typography: {
    displayLg: {
      fontSize: '57px',
      fontWeight: 400,
      lineHeight: '64px',
      // descrição: Headlines grandes, hero
    },
    headlineLg: {
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: '40px',
      // descrição: Títulos de seções
    },
    headlineMd: {
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: '36px',
      // descrição: Subtítulos
    },
    titleLg: {
      fontSize: '22px',
      fontWeight: 500,
      lineHeight: '28px',
      // descrição: Títulos de cards
    },
    titleMd: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      // descrição: Labels, botões
    },
    bodyLg: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      // descrição: Texto principal
    },
    bodyMd: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      // descrição: Texto secundário
    },
    bodySm: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      // descrição: Texto de apoio ou legendas pequenas
    },
    caption: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: '14px',
      // descrição: Notas e legendas
    },
  },
}as const

export type Theme = typeof theme;
