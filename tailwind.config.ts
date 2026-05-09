/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			navy: '#060c1a',
  			'navy-2': '#0a1224',
  			'navy-3': '#0e172e',
  			'navy-4': '#121d38',
  			cream: '#f5f5ee',
  			'cream-hover': '#eeeee6',
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
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			headergradient: "url('/headergradient.svg')",
  		},
  		boxShadow: {
  			'404': 'inset 20px 20px 300px black',
  			'gradient-border': '0 0 0 2px var(--tw-gradient-stops)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			},
  			'fade-up': {
  				from: { opacity: '0', transform: 'translateY(16px)' },
  				to: { opacity: '1', transform: 'translateY(0)' },
  			},
  			'marquee-scroll': {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-33.333%)' },
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
  				'33%': { transform: 'translateY(-12px) rotate(1.5deg)' },
  				'66%': { transform: 'translateY(6px) rotate(-1deg)' },
  			},
  			'float-slow': {
  				'0%, 100%': { transform: 'translateY(0) scale(1)' },
  				'50%': { transform: 'translateY(-8px) scale(1.02)' },
  			},
  			'pulse-glow': {
  				'0%, 100%': { opacity: '0.35' },
  				'50%': { opacity: '0.55' },
  			},
  			'drift-rotate': {
  				'0%': { transform: 'rotate(-12deg) translateX(0)' },
  				'25%': { transform: 'rotate(-10deg) translateX(5px)' },
  				'50%': { transform: 'rotate(-14deg) translateX(-3px)' },
  				'75%': { transform: 'rotate(-11deg) translateX(4px)' },
  				'100%': { transform: 'rotate(-12deg) translateX(0)' },
  			},
  			'spin-very-slow': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-up': 'fade-up 0.7s var(--ease-8vc-out) both',
  			'marquee': 'marquee-scroll 35s linear infinite',
  			'float': 'float 8s ease-in-out infinite',
  			'float-slow': 'float-slow 12s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
  			'drift-rotate': 'drift-rotate 15s ease-in-out infinite',
  			'spin-very-slow': 'spin-very-slow 90s linear infinite',
  			'marquee-photos': 'marquee-scroll 45s linear infinite',
  		},
  		fontFamily: {
  			freight: ['"freight-display-pro"', 'serif'],
  			sans: ['var(--font-dm-sans)', '"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
  			mono: ['var(--font-jetbrains-mono)', '"JetBrains Mono"', 'monospace'],
  		},
  		transitionTimingFunction: {
  			'8vc': 'cubic-bezier(.246,.75,.187,1)',
  			'8vc-out': 'cubic-bezier(.19,1,.22,1)',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
