import { Topic } from '@types';
import { useMemo, useState } from 'react';

const useTopicPage = ({ topics }: { topics: Topic[] }) => {
  const [search, setSearch] = useState('');

  const filteredTopics = useMemo(() => {
    if (!search) {
      return topics;
    }

    return topics.filter((topic) => topic.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return {
    search,
    setSearch,
    filteredTopics,
  };
};

export default useTopicPage;
