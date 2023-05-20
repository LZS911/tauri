import { render } from '@testing-library/react';
import DataSummaryPanel from '../index';
import TotalOrder from '../TotalOrder';
import TotalPageViews from '../TotalPageViews';
import TotalSales from '../TotalSales';
import TotalUser from '../TotalUser';

describe('test DataSummaryPanel', () => {
  test('should match snapshot', () => {
    const { container } = render(<DataSummaryPanel />);
    expect(container).toMatchSnapshot();
  });
});

describe('test TotalOrder', () => {
  test('should match snapshot', () => {
    const { container } = render(<TotalOrder />);
    expect(container).toMatchSnapshot();
  });
});

describe('test TotalPageViews', () => {
  test('should match snapshot', () => {
    const { container } = render(<TotalPageViews />);
    expect(container).toMatchSnapshot();
  });
});

describe('test TotalSales', () => {
  test('should match snapshot', () => {
    const { container } = render(<TotalSales />);
    expect(container).toMatchSnapshot();
  });
});

describe('test TotalUser', () => {
  test('should match snapshot', () => {
    const { container } = render(<TotalUser />);
    expect(container).toMatchSnapshot();
  });
});
