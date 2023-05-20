import Table from '../Table';
import { render } from '@testing-library/react';
describe('test Component', () => {
  it('should render Table to match snapshot', () => {
    const { container } = render(<Table />);
    expect(container).toMatchSnapshot();
  });
});
