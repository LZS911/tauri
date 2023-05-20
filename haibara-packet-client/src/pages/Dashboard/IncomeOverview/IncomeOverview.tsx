import { Column, ColumnConfig } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useRenderCustomPlots from '../../../customHooks/useRenderCustomPlots';
import { getWeekLocales } from '../Common';

const mockLastWeekData: () => ColumnConfig['data'] = () => {
  return getWeekLocales().map((w) => {
    return {
      date: w,
      value: Math.floor(Math.random() * 200),
    };
  });
};

const config: ColumnConfig = {
  data: [],
  xField: 'date',
  yField: 'value',
};

const IncomeOverview: React.FC = () => {
  const { t } = useTranslation();
  const customProps = useRenderCustomPlots();
  const [data, setData] = useState<ColumnConfig['data']>([
    { date: '', value: '' },
  ]);
  useEffect(() => {
    setData(mockLastWeekData());
  }, []);
  return (
    <div className="mb-5 max-w-[100%] basis-[100%] lg:max-w-[40%] lg:basis-[40%]">
      <div className="mb-4 flex items-center justify-between leading-[1.625rem] dark:text-white">
        <h2 className="font-semibold dark:text-white">
          {t('dashboard.incomeOverview.title')}
        </h2>

        <span className="text-xs">
          {t('dashboard.incomeOverview.subTitle')}
        </span>
      </div>

      <Column {...{ ...customProps, ...config, data }} />
    </div>
  );
};

export default IncomeOverview;
