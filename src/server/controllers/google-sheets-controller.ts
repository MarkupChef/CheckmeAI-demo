import { MetaPage, Topic } from '@types';
import { GOOGLE_SHEETS_PAGES, GOOGLE_SHEETS_TOPIC_LIST } from '@utils/constants/constants';
import doc from '@utils/helpers/connectToGoogleSheets';
import myCache from '@utils/nodeCache';

const ALL_TOPICS_META = 'all_topics_meta';

interface CachedData {
  topics: Topic[];
  metaData: MetaPage[];
}

export const getAllDataGSheets = async (): Promise<CachedData> => {
  let cachedData = myCache.get<CachedData>(ALL_TOPICS_META);

  if (!cachedData) {
    // console.log('Fetching data from Google Sheets...');

    try {
      await doc.loadInfo();

      const topicsSheet = doc.sheetsByTitle[GOOGLE_SHEETS_TOPIC_LIST];
      const topicsRows = await topicsSheet.getRows();

      const metaSheet = doc.sheetsByTitle[GOOGLE_SHEETS_PAGES];
      const metaRows = await metaSheet.getRows();

      const topics = topicsRows
        .map((row) => ({
          slug: row.get('slug'),
          name: row.get('name'),
          image: row.get('image') || '',
          isAvailable: row.get('isAvailable') === '1',
        }))
        .filter((topic) => topic.isAvailable)
        .sort((a, b) => a.name.localeCompare(b.name));

      const metaData = metaRows
        .map((row) => ({
          slug: row.get('slug'),
          title: row.get('title') || null,
          description: row.get('description') || null,
          content: row.get('content') || null,
        }))
        .filter((page) => page.slug);

      cachedData = { topics, metaData };
      myCache.set(ALL_TOPICS_META, cachedData);
    } catch (err: any) {
      throw new Error(`Error of loading data: ${err.message}`);
    }
  }

  return cachedData;
};
