import { ArrowRightOutlined } from '@ant-design/icons';
import useClientMediaQuery from '@hooks/useClientMediaQuery';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button, ConfigProvider } from 'antd';
import { getImageProps } from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../colors';
import certificateExampleMobile from '../../../../assets/img/Certificate-2d.jpg';
import certificateExample from '../../../../assets/img/certificate.png';

const { props: mobileImage } = getImageProps({
  src: certificateExampleMobile,
  width: 1241,
  height: 1754,
  alt: 'AI Certificate example.',
  quality: 100,
  priority: true,
});
const { props: desktopImage } = getImageProps({
  src: certificateExample,
  width: 1797,
  height: 1812,
  alt: 'AI Certificate example.',
  quality: 100,
  priority: true,
});

const CertificateSection = () => {
  const { t } = useTranslation();
  const isLg = useClientMediaQuery('(min-width: 1024px)');

  const renderBtn = () => (
    <ConfigProvider
      theme={{
        token: { colorPrimary: colors.orangered, colorPrimaryHover: colors['light-orangered'] },
      }}
    >
      <Link href={ROUTES.price} className={'inline-block'}>
        <Button
          type={'primary'}
          size={'large'}
          className={'btn-md !h-auto whitespace-normal !px-8 !py-3 font-semibold shadow-md'}
        >
          {t('get_certificate')}
          <ArrowRightOutlined />
        </Button>
      </Link>
    </ConfigProvider>
  );

  return (
    <section className={'py-[70px] lg:py-[100px]'}>
      <div className="container flex flex-col items-center justify-center gap-8 sm:gap-16 lg:flex-row">
        <div
          className={
            'flex flex-1 flex-col items-center justify-center gap-8 text-center sm:gap-16 lg:items-start lg:text-left'
          }
        >
          <h2 className={'text-4xl font-semibold sm:text-6xl'}>
            Get your first
            <br />
            <span className={'font-semibold text-seagreen-500'}>AI Certificate!</span>
          </h2>
          <p className={'text-lg sm:text-xl'}>
            Choose a topic and level, successfully pass the interview in the{' '}
            <span className={'font-semibold text-seagreen-500'}>&quot;Interview&quot;</span> mode and receive a
            certificate from the {PROJECT_NAME}, which fully confirms your knowledge of the topic. This certificate not
            only confirms that you&apos;ve successfully passed the Interview but also includes detailed information such
            as the topic, your score, the level of difficulty, time and link to the list of questions.
          </p>
          {isLg && renderBtn()}
        </div>
        <div className={`lg:flex-2 flex-1 text-center lg:text-left`}>
          <picture>
            <source media={'(max-width: 639px)'} srcSet={mobileImage.srcSet} width={1241} height={1754} />
            <img
              {...desktopImage}
              alt={desktopImage.alt}
              className={'relative z-[2] rounded-md shadow-md sm:aspect-[1/1] sm:rounded-none sm:shadow-none'}
            />
          </picture>

          {!isLg && <div className={'mt-12'}>{renderBtn()}</div>}
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
