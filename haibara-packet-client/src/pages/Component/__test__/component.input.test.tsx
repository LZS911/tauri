import Input from '../Input';
import { render } from '@testing-library/react';
describe('test Component', () => {
  it('should render Input to match snapshot', () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
