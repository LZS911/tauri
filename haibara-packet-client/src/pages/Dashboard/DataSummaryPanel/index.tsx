import { useTranslation } from 'react-i18next';
import TotalOrder from './TotalOrder';
import TotalPageViews from './TotalPageViews';
import TotalSales from './TotalSales';
import TotalUser from './TotalUser';

const DataSummaryPanel = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="font-semibold dark:text-white">
        {t('dashboard.dataSummary.title')}
      </h2>
      <div className="mb-6 flex flex-wrap justify-between">
        <TotalPageViews />
        <TotalUser />
        <TotalOrder />
        <TotalSales />
      </div>
    </>
  );
};

export default DataSummaryPanel;
