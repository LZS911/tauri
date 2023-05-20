import Table from '..';
import { render } from '@testing-library/react';
describe('test Table', () => {
  it('should render Table to match snapshot', () => {
    const { container } = render(<Table />);
    expect(container).toMatchSnapshot();
  });
});
