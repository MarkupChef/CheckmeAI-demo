import { getAllDataGSheets } from '@server/controllers/google-sheets-controller';
import { Topic } from '@types';
import { GOOGLE_SHEETS_TOPIC_LIST } from '@utils/constants/constants';
import doc from '@utils/helpers/connectToGoogleSheets';
import myCache, { CACHE_TOPICS_KEY } from '@utils/nodeCache';

export const getTopics = async (): Promise<Topic[] | []> => {
  let topics = myCache.get(CACHE_TOPICS_KEY) as Topic[] | [];

  if (!topics) {
    try {
      await doc.loadInfo();
      const sheet = doc.sheetsByTitle[GOOGLE_SHEETS_TOPIC_LIST];
      const rows = await sheet.getRows();

      topics = rows
        .map((row) => {
          return {
            slug: row.get('slug'),
            name: row.get('name'),
            image: row.get('image') || '',
            isAvailable: row.get('isAvailable') === '1',
          };
        })
        .filter((topic) => topic.isAvailable)
        .sort((a, b) => a.name.localeCompare(b.name));

      myCache.set(CACHE_TOPICS_KEY, topics);
    } catch (err: any) {
      throw new Error(`Server error getting topics: ${err.message}`);
    }
  }

  return topics || [];
};

export const getTopic = async (slug: string): Promise<Topic | undefined> => {
  try {
    const { topics } = await getAllDataGSheets();

    return topics.find((topic) => topic.slug === slug);
  } catch (err: any) {
    throw new Error(`Server error getting topics: ${err.message}`);
  }
};
