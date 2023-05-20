import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const targetPath = '/dashboard';
const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const backToHome = () => {
    navigate(targetPath);
  };
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <img
        title="not-found"
        src="/static/images/not-found.png"
        className="my-20"
      />

      <p className="text-4xl dark:text-white">{t('anomaly.notFound.title')}</p>

      <p className="my-4 w-[30%] text-center text-sm opacity-70 dark:text-white">
        {t('anomaly.notFound.subTitle')}
      </p>

      <Button type="primary" onClick={backToHome}>
        {t('anomaly.notFound.backToHome')}
      </Button>
    </div>
  );
};

export default NotFound;
