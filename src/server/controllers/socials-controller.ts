import { SocialLink } from '@types';
import { GOOGLE_SHEETS_SOCIALS } from '@utils/constants/constants';
import doc from '@utils/helpers/connectToGoogleSheets';
import myCache from '@utils/nodeCache';

const NODE_CACHED_KEY = 'socials';

export const getSocials = async (): Promise<any | never> => {
  try {
    let socials: SocialLink[] = myCache.get(NODE_CACHED_KEY) as SocialLink[];

    if (!socials) {
      await doc.loadInfo();
      const sheet = doc.sheetsByTitle[GOOGLE_SHEETS_SOCIALS];
      const rows = await sheet.getRows();

      socials = rows
        .map((row) => {
          return {
            key: row.get('key'),
            value: row.get('value') || null,
            name: row.get('name') || null,
            isAvailable: row.get('isAvailable') === '1',
          };
        })
        .filter((social) => social.isAvailable);

      myCache.set(NODE_CACHED_KEY, socials);
    }

    return socials;
  } catch (err: any) {
    throw new Error(`Server error: getting socials data: ${err.message}`);
  }
};
