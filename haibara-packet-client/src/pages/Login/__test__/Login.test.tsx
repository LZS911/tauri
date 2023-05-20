import { renderWithRouter } from '../../../testUtils/customRender';
import Login from '../index';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useUserConfig from '../../../customHooks/useUserConfig';
import { act, fireEvent, screen } from '@testing-library/react';

const mockUserConfig = {
  isLogin: false,
  token: '',
  username: '',
  emailAddress: '',
  userProfile: '',
};

const emailAddress = 'demo@qq.com';
const targetPath = '/dashboard';

jest.mock('react-router', () => {
  return {
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn(),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock('../../../customHooks/useUserConfig', () => {
  return { default: jest.fn() };
});

describe('test Login', () => {
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;

  const useUserConfigMock: jest.Mock = useUserConfig as jest.Mock;

  const useNavigateMock: jest.Mock = useNavigate as jest.Mock;
  const navigateMock = jest.fn();
  const setLoginUserInfoMock = jest.fn();
  const setLoginStateMock = jest.fn();
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) =>
      selector({
        userConfig: mockUserConfig,
      })
    );
    useUserConfigMock.mockImplementation(() => {
      return {
        setLoginUserInfo: setLoginUserInfoMock,
        setLoginState: setLoginStateMock,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should match snapshot', () => {
    const { container } = renderWithRouter(<Login />);

    expect(container).toMatchSnapshot();
  });

  test('should be to expected when clicking login button', async () => {
    const { container } = renderWithRouter(<Login />);
    expect(setLoginUserInfoMock).toBeCalledTimes(0);
    expect(setLoginStateMock).toBeCalledTimes(0);
    expect(navigateMock).toBeCalledTimes(0);

    await act(() => {
      fireEvent.input(container.querySelectorAll('input')[0], {
        target: { value: emailAddress },
      });

      fireEvent.input(container.querySelectorAll('input')[1], {
        target: { value: '1234' },
      });

      fireEvent.click(screen.getByText('login.loginForm.submitText'));
    });

    expect(setLoginUserInfoMock).toBeCalledTimes(1);
    expect(setLoginUserInfoMock).toBeCalledWith({
      username: 'Gll Ly',
      emailAddress,
      userProfile: 'Default user',
    });
    expect(setLoginStateMock).toBeCalledTimes(1);
    expect(setLoginStateMock).toBeCalledWith({
      token: 'df3fd3',
      isLogin: true,
    });
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith(targetPath);
  });
});
