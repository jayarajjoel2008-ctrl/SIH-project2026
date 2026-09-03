/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			'3xl': '1.75rem',
  			'4xl': '2.25rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '#4E36E2',
  				foreground: '#FFFFFF',
  				dark: '#3C28B6',
  				light: '#EEF0FD'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: '#FF8C68',
  				foreground: '#1E1B4B',
  				soft: '#FFA07A',
  				light: '#FFF0EB'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': '#4E36E2',
  				'2': '#FFA07A',
  				'3': '#FFB396',
  				'4': '#6C5CE7',
  				'5': '#CBD5E1'
  			},
  			brand: {
  				purple: '#4E36E2',
  				'purple-dark': '#3C28B6',
  				'purple-light': '#EEF0FD',
  				'purple-soft': '#6C5CE7',
  				peach: '#FF8C68',
  				'peach-soft': '#FFA07A',
  				'peach-pink': '#FFB396',
  				'peach-light': '#FFF0EB',
  				navy: '#1E1B4B',
  				slate: '#8E95B2',
  				bg: '#EEF2F8',
  				card: '#FFFFFF',
  				pill: '#F4F6FB'
  			}
  		},
  		fontFamily: {
  			heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
  			body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
  			display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
  			mono: ['var(--font-mono)']
  		},
  		boxShadow: {
  			'soft': '0 10px 30px -5px rgba(45, 55, 95, 0.05), 0 4px 12px -2px rgba(45, 55, 95, 0.02)',
  			'soft-lg': '0 16px 40px -8px rgba(45, 55, 95, 0.08), 0 6px 16px -3px rgba(45, 55, 95, 0.03)',
  			'soft-circle': '0 4px 14px 0 rgba(71, 91, 166, 0.08), 0 1px 3px 0 rgba(71, 91, 166, 0.04)',
  			'soft-purple': '0 8px 25px -4px rgba(78, 54, 226, 0.35)',
  			'soft-peach': '0 8px 25px -4px rgba(255, 140, 104, 0.35)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		transitionDuration: {
  			'4000': '4000ms',
  			'6000': '6000ms'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
