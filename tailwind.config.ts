import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#07050a',
          800: '#100a14',
          700: '#1a121f',
          600: '#251a2b'
        },
        phosphor: {
          400: '#5cff85',
          500: '#00ff41',
          600: '#00b32d'
        },
        amber: {
          400: '#ffd98a',
          500: '#ffb454',
          600: '#d98f2e'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        flicker: {
          '0%': { opacity: '0.96' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' }
        },
        stripe: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '32px 0' }
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        flicker: 'flicker 0.15s infinite',
        stripe: 'stripe 1s linear infinite'
      }
    }
  }
}
