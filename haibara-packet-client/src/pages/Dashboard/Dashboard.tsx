import UniqueVisitorPanel from './UniqueVisitorPanel';
import DataSummaryPanel from './DataSummaryPanel';
import IncomeOverview from './IncomeOverview/IncomeOverview';

const Dashboard: React.FC = () => {
  return (
    <>
      <DataSummaryPanel />

      <div className="flex flex-wrap justify-between">
        <UniqueVisitorPanel />
        <IncomeOverview />
      </div>
    </>
  );
};

export default Dashboard;
