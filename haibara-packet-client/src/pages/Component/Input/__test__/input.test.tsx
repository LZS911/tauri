import Input from '..';
import { render } from '@testing-library/react';
describe('test Input', () => {
  it('should render Input to match snapshot', () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
