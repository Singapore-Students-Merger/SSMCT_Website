import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';
import { PluginCreator } from 'tailwindcss/types/config';
import typographPlugin from '@tailwindcss/typography';

const addAnimationDelayPlugin: PluginCreator = ({ addUtilities, theme }) => {
  const delays = theme('animationDelay') as Record<string, string>;

  const utilities = Object.entries(delays).reduce((acc, [key, value]) => {
    acc[`.animate-delay-${key}`] = { 'animation-delay': value };
    return acc;
  }, {} as Record<string, Record<string, string>>);

  addUtilities(utilities, { respectPrefix: false, respectImportant: false });
};

const addAnimationDurationPlugin: PluginCreator = ({ addUtilities, theme }) => {
  const durations = theme('animationDuration') as Record<string, string>;

  const utilities = Object.entries(durations).reduce((acc, [key, value]) => {
    acc[`.animate-duration-${key}`] = { 'animation-duration': value };
    return acc;
  }, {} as Record<string, Record<string, string>>);

  addUtilities(utilities, { respectPrefix: false, respectImportant: false });
}

const radialGradientPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        // map to bg-radient-[*]
        'bg-radient': value => ({
          'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`,
        }),
      },
      { values: theme('radialGradients') }
    )
  },
  {
    theme: {
      radialGradients: _presets(),
    },
  }
)

/**
 * utility class presets
 */
function _presets() {
  const shapes = ['circle', 'ellipse'];
  const pos = {
    c: 'center',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right',
  };
  const result: { [key: string]: string } = {};
  for (const shape of shapes)
    for (const [posName, posValue] of Object.entries(pos))
      result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

  return result;
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            strong: { color: 'rgb(var(--foreground))', fontWeight: 'bold' },
            bold: { color: 'rgb(var(--foreground))', fontWeight: 'bold' },
            h1: { color: 'rgb(var(--foreground))', fontWeight: 'bold', borderBottom: '2px solid rgb(var(--foreground))' },
            h2: { color: 'rgb(var(--foreground))', fontWeight: 'bold', borderBottom: '1px solid rgb(var(--secondary))' },
            h3: { color: 'rgb(var(--foreground))', fontWeight: 'bold' },
            h4: { color: '#fff', fontWeight: 'bold' },
            a: { color: '#3182ce', textDecoration: 'none' },
            code: { color: 'rgb(var(--foreground))', background: 'rgb(var(--tertiary))' },
          },
        },
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '500': '500ms',
        '1000': '1s',
        '1200': '1.2s',
        '1500': '1.5s',
        '1700': '1.7s',
        '2000': '2s',
      },
      animationDuration: {
        '100': '100ms',
        '200': '200ms',
        '500': '500ms',
        '1000': '1s',
        '1200': '1.2s',
        '1500': '1.5s',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out backwards',
        fadeOut: 'fadeOut 1s ease-in-out backwards',
        bgFade: 'bgFade 1.5s ease-in-out backwards',
        'fadeIn-top': 'fadeInTop 1s ease-in-out backwards',
        'fadeIn-bottom': 'fadeInBottom 1s ease-in-out backwards',
        'fadeIn-left': 'fadeInLeft 1s ease-in-out backwards',
        'fadeIn-right': 'fadeInRight 1s ease-in-out backwards',
        'fadeOut-top': 'fadeOutTop 1s ease-in-out backwards',
        'fadeOut-bottom': 'fadeOutBottom 1s ease-in-out backwards',
        'fadeOut-left': 'fadeOutLeft 1s ease-in-out backwards',
        'fadeOut-right': 'fadeOutRight 1s ease-in-out backwards',
        'title-tl':"titleTl 0.5s ease-in-out backwards",
        'title-br':"titleBr 0.5s ease-in-out backwards",
      },
      keyframes: {
        titleTl: {
          '0%': { marginLeft: '0', marginTop: '0'},
          '100%': { marginLeft: '-4px', marginTop: '-1px'},
        },
        titleBr: {
          '0%': { marginLeft: '0', marginTop: '0'},
          '100%': { marginLeft: '4px', marginTop: '1px'},
        },
        fadeInTop: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInBottom: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOutTop: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        fadeOutBottom: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
        fadeOutLeft: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' },
        },
        fadeOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bgFade: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '0.3' },
        },
      },
      fontSize: {
        'body-sm': '0.9rem', // Small screens
        'body-md': '0.95rem',   // Medium screens
        'body-lg': '1rem',    // Large screens
      },
      colors: {
        background: "rgb(var(--background) /<alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)", // Default secondary color
          tier1: "rgb(63 100 115 / <alpha-value>)", // Tier 1 with alpha
          tier2: "rgb(76 98 107 / <alpha-value>)", // Tier 2 with alpha
          tier3: "rgb(30 61 73 / <alpha-value>)", // Tier 3 with alpha
        },
        accent1: "rgb(var(--accent) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
      },
    },
  },
  plugins: [radialGradientPlugin,addAnimationDelayPlugin, typographPlugin, addAnimationDurationPlugin],
} satisfies Config;
