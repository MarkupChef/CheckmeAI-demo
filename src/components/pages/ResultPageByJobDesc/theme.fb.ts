import { CustomFlowbiteTheme } from 'flowbite-react';

export const accordionQuestionTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: 'divide-y divide-gray-200 dark:divide-gray-700',
      flush: {
        off: 'rounded-3xl',
        on: '',
      },
    },
    content: {
      base: 'bg-white py-5 px-5 rounded-b-3xl text-left shadow-md dark:bg-gray-900',
    },
    title: {
      arrow: {
        base: 'w-7 h-7 md:w-10 md:h-10 shrink-0 ml-1',
        open: {
          off: '',
          on: 'rotate-180',
        },
      },
      base: 'bg-white text-sm md:text-base lg:text-lg 2xl:text-2xl shadow-md flex w-full items-center justify-between rounded-3xl py-5 px-5 text-left font-medium dark:text-gray-400',
      flush: {
        off: 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300',
        on: 'bg-transparent dark:bg-transparent',
      },
      heading: '',
      open: {
        off: '',
        on: 'rounded-b-none shadow-none dark:bg-gray-800 dark:text-white',
      },
    },
  },
};
