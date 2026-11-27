import { RESULT_CONTAINER_ID } from '@components/pages/TopicsPage/TopicsPage';
import { SearchProps } from 'antd/es/input';
import Search from 'antd/lib/input/Search';
import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './topicSearch.module.scss';

interface TopicSearchProps {
  setSearch: Dispatch<SetStateAction<string>>;
  className?: string;
}

const TopicSearch: FC<TopicSearchProps> = ({ setSearch, className = '' }) => {
  const { t } = useTranslation();

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearch(() => value);
  };

  const onChange: SearchProps['onChange'] = (e) => {
    setSearch(() => e.target.value);
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <Search
        id={'topicSearch'}
        className={styles.search}
        placeholder={t('search_topic') || 'Search topic'}
        onSearch={onSearch}
        onChange={onChange}
        aria-label={t('search_topic') || 'Search topic'}
        aria-controls={RESULT_CONTAINER_ID}
      />
    </div>
  );
};

export default TopicSearch;
