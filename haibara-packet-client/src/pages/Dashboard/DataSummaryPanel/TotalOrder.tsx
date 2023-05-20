import { useTranslation } from 'react-i18next';
import { DashboardPanelEnum } from '..';
import SummaryPanelWrapper, { DataTrendEnum } from '../Common';

const mockData = () => {
  return {
    trend: DataTrendEnum.fall,
    trendData: 0.224,
    totalData: 17364,
  };
};

const TotalOrder: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SummaryPanelWrapper
      key={DashboardPanelEnum.TotalOrder}
      title={t('backend.dashboard.dataSummaryPanel.title3')}
      {...mockData()}
    />
  );
};

export default TotalOrder;
