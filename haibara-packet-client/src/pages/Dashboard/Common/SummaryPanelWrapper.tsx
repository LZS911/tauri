import { genDesc, genTrend, SummaryCommonPanelProps } from '.';
import ThemeBase from '../../../components/ThemeBase';
import { formatPrice } from '../../../utils/math';

const SummaryPanelWrapper: React.FC<SummaryCommonPanelProps> = ({
  totalData = 0,
  trend,
  trendData = 0,
  title,
  addSymbol = false,
}) => {
  return (
    <ThemeBase.Paper className="mt-4 max-w-[100%] basis-[100%] rounded-md border border-stone-200 p-5 dark:border-stone-700 md:max-w-[48%] md:basis-[48%] lg:max-w-[32%] lg:basis-[32%] xl:max-w-[23%] xl:basis-[23%]">
      <div className="opacity-70 hover:cursor-pointer">{title}</div>
      <div className="mb-4 mt-2 flex">
        <div className="mr-4 text-xl font-bold">
          {formatPrice(totalData, addSymbol)}
        </div>
        {genTrend(trend, trendData)}
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs opacity-70">
        {genDesc(trend, trendData)}
      </div>
    </ThemeBase.Paper>
  );
};

export default SummaryPanelWrapper;
