import { getAllDataGSheets } from '@server/controllers/google-sheets-controller';

export const getMetaPage = async (slug: string): Promise<any | never> => {
  const { metaData } = await getAllDataGSheets();

  return metaData.find((page) => page.slug === slug) || {};
};
