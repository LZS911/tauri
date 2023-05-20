import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import { DashboardPanelEnum } from '..';
import i18n from '../../../locale';
import { floatToPercent } from '../../../utils/math';
import SummaryPanelWrapper from './SummaryPanelWrapper';
export interface SummaryCommonPanelProps {
  key: DashboardPanelEnum;
  totalData?: number;
  trend?: DataTrendEnum;
  trendData?: number;
  title: string;
  addSymbol?: boolean;
}

export enum DataTrendEnum {
  rise = 'rise',
  fall = 'fall',
}
export interface IDataSummaryItem {
  id: number;
  title: string;
}
export interface IBackendDataSummaryPanel {
  id: number;
  trend: DataTrendEnum;
  trendData: number;
  total: number;
}

export const genTrend = (trend?: DataTrendEnum, trendData?: number) => {
  if (!trend || trendData === undefined) {
    return;
  }

  return (
    <span
      className={`${
        trend === DataTrendEnum.fall
          ? 'border-yellow-500 bg-[#fff7e0] text-yellow-500 dark:bg-[#342c1a]'
          : 'border-primary bg-secondary text-primary'
      } flex items-center rounded-md border  px-2 text-xs`}
    >
      {trend === DataTrendEnum.fall ? (
        <FallOutlined className="mr-1" />
      ) : (
        <RiseOutlined className="mr-1" />
      )}
      {floatToPercent(trendData)}
    </span>
  );
};

export const genDesc = (trend?: DataTrendEnum, trendData?: number) => {
  if (!trend || !trendData) {
    return null;
  }

  if (trend === DataTrendEnum.rise) {
    return i18n.t('dashboard.dataSummary.panelRiseDesc', {
      trendData: floatToPercent(trendData),
    });
  }

  return i18n.t('dashboard.dataSummary.panelFailDesc', {
    trendData: floatToPercent(trendData),
  });
};

export const getMonthLocales = () => {
  return [
    i18n.t('common.date.monthData.Jan'),
    i18n.t('common.date.monthData.Feb'),
    i18n.t('common.date.monthData.Mar'),
    i18n.t('common.date.monthData.Apr'),
    i18n.t('common.date.monthData.May'),
    i18n.t('common.date.monthData.Jun'),
    i18n.t('common.date.monthData.Jul'),
    i18n.t('common.date.monthData.Aug'),
    i18n.t('common.date.monthData.Sep'),
    i18n.t('common.date.monthData.Oct'),
    i18n.t('common.date.monthData.Nov'),
    i18n.t('common.date.monthData.Dec'),
  ];
};
export const getWeekLocales = () => {
  return [
    i18n.t('common.date.weekData.Mon'),
    i18n.t('common.date.monthData.Tue'),
    i18n.t('common.date.monthData.Wed'),
    i18n.t('common.date.monthData.Thu'),
    i18n.t('common.date.monthData.Fri'),
    i18n.t('common.date.monthData.Sat'),
    i18n.t('common.date.monthData.Sun'),
  ];
};

export default SummaryPanelWrapper;
