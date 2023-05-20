import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useBoolean, useToggle } from 'ahooks';
import { forwardRef, HTMLInputTypeAttribute, useMemo } from 'react';
import { LoginInputProps } from '.';
import ThemeBase from '../../components/ThemeBase';
import usePropsValue from '../../hooks/usePropsValue';

const LoginInput: React.ForwardRefRenderFunction<
  HTMLDivElement,
  LoginInputProps
> = (
  {
    placeholder,
    prefix,
    value,
    onChange,
    defaultValue = '',
    label,
    type = 'text',
    name,
  },
  ref
) => {
  const [internalValue, setInternalValue] = usePropsValue<string>({
    defaultValue,
    value,
    onChange,
  });
  const [isFocus, { setFalse: clearFocus, setTrue: setFocus }] =
    useBoolean(false);
  const [isShowPassword, { toggle: togglePasswordVisibility }] =
    useToggle(false);
  const internalType = useMemo((): HTMLInputTypeAttribute => {
    if (type !== 'password') {
      return type;
    }

    return isShowPassword ? 'text' : 'password';
  }, [isShowPassword, type]);
  return (
    <>
      <div ref={ref} className="mb-1 text-xs">
        <span className="text-xs text-black opacity-90 dark:text-white">
          {label}
        </span>
      </div>
      <div
        className={`flex w-full items-center border-b-2 pb-2 pl-2 ${
          isFocus ? 'border-primary' : 'border-gray-300'
        } transition-colors`}
      >
        <span className="dark:text-white">{prefix}</span>
        <input
          id={name}
          type={internalType}
          className={`ml-3 h-full w-4/5 p-2 outline-0 dark:bg-darkMode dark:text-white`}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
          }}
          placeholder={placeholder}
          onFocus={setFocus}
          onBlur={clearFocus}
        />
        {type === 'password' && (
          <ThemeBase.Icon
            onClick={togglePasswordVisibility}
            icon={isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          />
        )}
      </div>
    </>
  );
};

export default forwardRef(LoginInput);
