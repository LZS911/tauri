import { render } from '@testing-library/react';
import { DashboardPanelEnum } from '../..';
import SummaryPanelWrapper, {
  DataTrendEnum,
  genDesc,
  genTrend,
} from '../index';

const title = 'test';

describe('test Common', () => {
  test('should match snapshot for genDesc', () => {
    expect(genDesc()).toMatchSnapshot();
    expect(genDesc(DataTrendEnum.fall)).toMatchSnapshot();
    expect(genDesc(undefined, 10)).toMatchSnapshot();
    expect(genDesc(DataTrendEnum.fall, 20)).toMatchSnapshot();
  });

  test('should match snapshot for genTrend', () => {
    expect(genTrend()).toMatchSnapshot();
    expect(genTrend(DataTrendEnum.fall)).toMatchSnapshot();
    expect(genTrend(undefined, 10)).toMatchSnapshot();
    expect(genTrend(DataTrendEnum.fall, 20)).toMatchSnapshot();
  });

  test('should match snapshot for SummaryPanelWrapper', () => {
    const { container } = render(
      <SummaryPanelWrapper
        trend={DataTrendEnum.fall}
        title={title}
        key={DashboardPanelEnum.TotalOrder}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
