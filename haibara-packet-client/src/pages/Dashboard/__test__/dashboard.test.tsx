import { renderWithRedux } from '../../../testUtils/customRender';
import Dashboard from '../Dashboard';
describe('test Dashboard', () => {
  it('should render Dashboard to match snapshot', () => {
    const { container } = renderWithRedux(<Dashboard />);
    expect(container).toMatchSnapshot();
  });
});
