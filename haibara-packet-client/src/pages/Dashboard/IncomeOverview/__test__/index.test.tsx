import { renderWithRedux } from '../../../../testUtils/customRender';
import IncomeOverview from '../index';

describe('test IncomeOverview', () => {
  test('should match snapshot', () => {
    const { container } = renderWithRedux(<IncomeOverview />);
    expect(container).toMatchSnapshot();
  });
});
