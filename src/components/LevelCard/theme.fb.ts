import { CustomFlowbiteTheme } from 'flowbite-react';

export const levelCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'rounded-2xl lg:rounded-3xl bg-white shadow-md flex max-w-sm dark:bg-gray-800 justify-center',
    children: 'flex h-full flex-row justify-center items-center gap-6 px-8 lg:px-10 py-2 lg:py-4',
    horizontal: {
      off: '',
      on: '',
    },
  },
};
