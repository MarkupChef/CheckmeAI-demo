import { CustomFlowbiteTheme } from 'flowbite-react';

export const topicCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'w-full max-w-[17.5rem] h-[7.5rem] lg:w-auto lg:h-auto flex items-center rounded-3xl bg-white shadow-md max-w-sm dark:bg-gray-800 mx-auto',
    children: 'flex w-full h-full justify-center items-center gap-6 xl:gap-8 px-6 py-6 xl:px-8 xl:py-8',
  },
};
