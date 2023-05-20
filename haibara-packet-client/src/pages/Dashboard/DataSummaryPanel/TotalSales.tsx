import { useTranslation } from 'react-i18next';
import { DashboardPanelEnum } from '..';
import SummaryPanelWrapper, { DataTrendEnum } from '../Common';

const mockData = () => {
  return {
    trend: DataTrendEnum.fall,
    trendData: 0.627,
    totalData: 35078,
  };
};

const TotalSales: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SummaryPanelWrapper
      key={DashboardPanelEnum.TotalSales}
      title={t('backend.dashboard.dataSummaryPanel.title4')}
      addSymbol={true}
      {...mockData()}
    />
  );
};

export default TotalSales;
