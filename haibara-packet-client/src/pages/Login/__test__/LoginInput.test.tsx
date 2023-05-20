import { fireEvent, render, screen } from '@testing-library/react';
import { renderWithRedux } from '../../../testUtils/customRender';
import LoginInput from '../LoginInput';

const placeholder = 'this is placeholder';
const prefix = 'prefix';
const label = 'label';
const defaultValue = 'defaultValue';
const value = 'value';
const onChange = jest.fn();

describe('test LoginInput', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });
  test('should match snapshot', () => {
    const { container } = render(
      <LoginInput placeholder={placeholder} prefix={prefix} label={label} />
    );

    expect(container).toMatchSnapshot();

    fireEvent.focus(container.querySelector('input')!);
    expect(container).toMatchSnapshot();
  });

  test('should set defaultValue when defaultValue is defined', () => {
    const { container } = render(
      <LoginInput
        placeholder={placeholder}
        prefix={prefix}
        label={label}
        defaultValue={defaultValue}
      />
    );

    expect(container.querySelector('input')).toHaveValue(defaultValue);
  });

  test('should be able to switch types when type is password', () => {
    const { container } = renderWithRedux(
      <LoginInput
        placeholder={placeholder}
        prefix={prefix}
        label={label}
        type="password"
      />
    );

    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'password'
    );
    expect(screen.getByRole('img')).not.toBeUndefined();
    fireEvent.click(screen.getByRole('img'));
    expect(container.querySelector('input')).toHaveAttribute('type', 'text');
  });

  test('should trigger onChange props when modifying input value', () => {
    const { container } = render(
      <LoginInput
        placeholder={placeholder}
        prefix={prefix}
        label={label}
        value={value}
        onChange={onChange}
      />
    );

    expect(onChange).toBeCalledTimes(0);
    fireEvent.change(container.querySelector('input')!, {
      target: { value: 'test' },
    });
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('test');
  });
});
