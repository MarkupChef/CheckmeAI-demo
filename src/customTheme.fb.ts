import { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
  button: {
    base: 'group flex h-min items-center justify-center text-center font-semibold shadow-md transition-colors duration-300 active:transition-none active:duration-0 focus:z-10 focus:outline-none focus:ring-0 focus:ring-transparent',
    color: {
      primary:
        'text-white bg-orangered border border-transparent enabled:hover:bg-light-orangered active:shadow-btn-active',
      secondary: 'font-semibold bg-gray-50 shadow-md hover:bg-gray-100 active:shadow-btn-active',
    },
    outline: {
      color: {
        primary: '',
      },
      on: 'flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full',
    },
    pill: {
      off: 'rounded-[0.6em]',
      on: 'rounded-full',
    },
    size: {
      xs: 'text-sm px-[1.1em] py-[0.6em]',
      sm: 'text-[0.75rem] lg:text-base px-[1.1em] py-[0.6em]',
      rg: 'text-[1rem] lg:text-xl px-[1.1em] py-[0.6em]',
      md: 'text-[1.25rem] lg:text-2xl px-[1.1em] py-[0.6em]',
      lg: 'text-[1.75rem] lg:text-[2rem] px-[1.1em] py-[0.6em]',
      xl: 'text-[2.25rem] lg:text-[2.5rem] px-[1.1em] py-[0.6em]',

      's-xs': 'text-xs px-2 py-1',
      's-sm': 'text-sm px-3 py-1.5',
      's-md': 'text-lg px-[1.333em] py-[0.65em] rounded-[0.777em]',
      's-lg': 'text-base px-5 py-2.5',
      's-xl': 'text-base px-6 py-3',
    },
  },
  card: {
    root: {
      base: 'rounded-3xl bg-white shadow-md',
    },
  },
};

export default customTheme;
