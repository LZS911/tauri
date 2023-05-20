import { renderWithRedux } from '../../../../testUtils/customRender';
import UniqueVisitorPanel from '../..';
describe('test UniqueVisitorPanel', () => {
  it('should render UniqueVisitorPanel to match snapshot', () => {
    const { container } = renderWithRedux(<UniqueVisitorPanel />);
    expect(container).toMatchSnapshot();
  });
});
