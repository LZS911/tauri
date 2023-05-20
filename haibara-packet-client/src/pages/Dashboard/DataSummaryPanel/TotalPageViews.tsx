import { useTranslation } from 'react-i18next';
import { DashboardPanelEnum } from '..';
import SummaryPanelWrapper, { DataTrendEnum } from '../Common';

const mockData = () => {
  return {
    trend: DataTrendEnum.rise,
    trendData: 0.627,
    totalData: 43298,
  };
};

const TotalPageViews: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SummaryPanelWrapper
      key={DashboardPanelEnum.TotalPageViews}
      title={t('backend.dashboard.dataSummaryPanel.title1')}
      {...mockData()}
    />
  );
};

export default TotalPageViews;
