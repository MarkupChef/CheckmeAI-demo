import Certificate from '@components/Certificate';
import { CertificateProps } from '@components/Certificate/Certificate';
import LoadingIcon from '@components/Icons/LoadingIcon';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, ConfigProvider } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../colors';

const CertificateDownloadLink: FC<CertificateProps & { fileName: string }> = ({ fileName, ...certificateProps }) => {
  const { t } = useTranslation();

  const renderBtn = () => (
    <ConfigProvider
      theme={{ token: { colorPrimary: colors['seagreen-900'], colorPrimaryHover: colors['seagreen-700'] } }}
    >
      <Button
        type={'primary'}
        size={'large'}
        className={
          'btn-md mx-auto mt-20 !flex !h-auto w-fit !px-8 !py-3 !text-[1.25rem] !font-semibold shadow-md lg:!text-2xl'
        }
      >
        {t('download_certificate')}
      </Button>
    </ConfigProvider>
  );

  return (
    <PDFDownloadLink document={<Certificate {...certificateProps} />} fileName={fileName}>
      {/* TODO: there are valuer as blob and url */}
      {({ loading, error }: { loading: boolean; error: Error | null }) =>
        error ? (
          <p className={'text-center'}>{t('error_creating_certificate')}</p>
        ) : loading ? (
          <LoadingIcon fontSize={'40px'} />
        ) : (
          renderBtn()
        )
      }
    </PDFDownloadLink>
  );
};

export default CertificateDownloadLink;
