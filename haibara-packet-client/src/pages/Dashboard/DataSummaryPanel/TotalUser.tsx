import { useTranslation } from 'react-i18next';
import { DashboardPanelEnum } from '..';
import SummaryPanelWrapper, { DataTrendEnum } from '../Common';

const mockData = () => {
  return {
    trend: DataTrendEnum.rise,
    trendData: 0.717,
    totalData: 76221,
  };
};

const TotalUsers: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SummaryPanelWrapper
      key={DashboardPanelEnum.TotalUsers}
      title={t('backend.dashboard.dataSummaryPanel.title2')}
      {...mockData()}
    />
  );
};

export default TotalUsers;
