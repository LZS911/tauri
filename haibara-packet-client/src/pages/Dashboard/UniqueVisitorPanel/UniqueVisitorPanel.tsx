import { Line, LineConfig } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetVisitorDataQueryEnum } from '.';
import ThemeBase from '../../../components/ThemeBase';
import useRenderCustomPlots from '../../../customHooks/useRenderCustomPlots';
import { getMonthLocales, getWeekLocales } from '../Common';

const mockMonthData: () => LineConfig['data'] = () => {
  return [
    ...getMonthLocales().map((w) => {
      return {
        date: w,
        value: Math.floor(Math.random() * 200),
        category: 'pageViews',
      };
    }),
    ...getMonthLocales().map((w) => {
      return {
        date: w,
        value: Math.floor(Math.random() * 200),
        category: 'sessions',
      };
    }),
  ];
};
const mockWeekData: () => LineConfig['data'] = () => {
  return [
    ...getWeekLocales().map((w) => {
      return {
        date: w,
        value: Math.floor(Math.random() * 20),
        category: 'pageViews',
      };
    }),
    ...getWeekLocales().map((w) => {
      return {
        date: w,
        value: Math.floor(Math.random() * 20),
        category: 'sessions',
      };
    }),
  ];
};
const config: LineConfig = {
  data: [],
  padding: 'auto',
  xField: 'date',
  yField: 'value',
  seriesField: 'category',
};

const UniqueVisitorPanel: React.FC = () => {
  const { t } = useTranslation();
  const customPlotsProps = useRenderCustomPlots();
  const [getVisitorDataQuery, setGetVisitorDataQuery] =
    useState<GetVisitorDataQueryEnum>(GetVisitorDataQueryEnum.week);
  const [data, setData] = useState<LineConfig['data']>([
    { date: '', value: '', category: '' },
  ]);

  const areaProps = { ...config, ...customPlotsProps, data };

  const handleClickMonth = () => {
    setGetVisitorDataQuery(GetVisitorDataQueryEnum.month);
  };
  const handleClickWeek = () => {
    setGetVisitorDataQuery(GetVisitorDataQueryEnum.week);
  };

  useEffect(() => {
    setData(
      getVisitorDataQuery === GetVisitorDataQueryEnum.month
        ? mockMonthData()
        : mockWeekData()
    );
  }, [getVisitorDataQuery]);

  return (
    <div className="mb-5 max-w-[100%] basis-[100%] lg:max-w-[57%] lg:basis-[57%]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold dark:text-white">
          {t('dashboard.uniqueVisitor.title')}
        </h2>

        <div className="flex">
          <ThemeBase.Icon
            onClick={handleClickMonth}
            icon={t('common.date.month')}
            className={`border px-4 py-1 text-xs transition-all dark:hover:!bg-darkMode ${
              getVisitorDataQuery === GetVisitorDataQueryEnum.month
                ? 'border-primary !text-primary'
                : 'border-transparent'
            }`}
          />
          <ThemeBase.Icon
            onClick={handleClickWeek}
            icon={t('common.date.week')}
            className={`border px-4 py-1 text-xs transition-all dark:hover:!bg-darkMode ${
              getVisitorDataQuery === GetVisitorDataQueryEnum.week
                ? 'border-primary !text-primary'
                : 'border-transparent'
            }`}
          />
        </div>
      </div>
      <Line {...areaProps} />
    </div>
  );
};

export default UniqueVisitorPanel;
