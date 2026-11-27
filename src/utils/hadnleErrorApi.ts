import { NextApiResponse } from 'next';

const handleErrorApi = (res: NextApiResponse, error: string): void => {
  res.status(500).json(error);
};

export default handleErrorApi;
