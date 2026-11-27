import { CustomFlowbiteTheme } from 'flowbite-react';

export const navbarTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: 'relative bg-transparent dark:border-gray-700 dark:bg-gray-800 px-4 md:px-8 xl:px-11',
      rounded: {
        on: 'rounded',
        off: '',
      },
      bordered: {
        on: 'border',
        off: '',
      },
      inner: {
        base: 'mx-auto flex flex-wrap items-center justify-between',
        fluid: {
          on: '',
          off: 'container',
        },
      },
    },
    brand: {
      base: 'flex items-center',
    },
    collapse: {
      base: 'absolute md:static md:ml-auto top-[100%] left-1/2 translate-x-[-50%] md:translate-x-0 px-4 z-10 w-full md:block md:w-auto ',
      list: 'flex flex-col md:items-center md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium shadow-md md:shadow-none rounded-lg overflow-hidden',
      hidden: {
        on: 'hidden',
        off: 'md:bg-transparent mt-4 md:mt-0',
      },
    },
    link: {
      base: 'block py-4 pr-4 pl-4 md:p-0 font-semibold text-lg no-underline lg:text-xl hover:text-seagreen-900 focus:text-white',
      active: {
        on: 'text-white md:text-default dark:text-white bg-seagreen-900 md:bg-transparent nav-link-active',
        off: 'border-b border-gray-100 hover:bg-gray-50 bg-powderblue md:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white',
      },
      disabled: {
        on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
        off: '',
      },
    },
    toggle: {
      base: 'bg-transparent inline-flex items-center rounded-lg p-2 text-sm text-gray-500 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden',
      icon: 'h-6 w-6 shrink-0 text-default',
    },
  },
};
