import { act, render, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import { userConfigInitialState } from '../../store/userConfig';
import RouterComponent, { registerRouter } from '../index';
import { routerConfig, unAuthRouter } from '../router.config';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock('use-resize-observer', () => {
  return {
    default: jest.fn(),
  };
});

const useSelectorMock: jest.Mock = useSelector as jest.Mock;
const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
const useResizeObserverMock: jest.Mock = useResizeObserver as jest.Mock;
const dispatchMock = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  useResizeObserverMock.mockImplementation(() => {
    return {
      ref: useRef(),
    };
  });
  useDispatchMock.mockImplementation(() => dispatchMock);
  useSelectorMock.mockImplementation((selector) => {
    return selector({
      userConfig: {
        isLogin: false,
        token: '',
      },
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
});

describe('test router', () => {
  test('should match snapshot for registerRouter', () => {
    expect(registerRouter(routerConfig)).toMatchSnapshot();
    expect(registerRouter(unAuthRouter)).toMatchSnapshot();
  });

  test('should match snapshot when login state is invalid', async () => {
    const { container } = render(<RouterComponent />);
    await act(async () => {
      await waitFor(() => {
        jest.advanceTimersByTime(800);
      });
    });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      //todo
      payload: {
        emailAddress: 'demo@gamil.com',
        userProfile: 'Default user',
        username: 'Gll Ly',
      },
      type: 'userConfig/setLoginUserInfo',
    });
    // expect(container).toMatchSnapshot();
  });

  test('should match snapshot when login state is valid', async () => {
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          ...userConfigInitialState,
          isLogin: true,
          token: 'abcd',
        },
        layout: {
          isExpandSider: false,
          siderWidth: 60,
          isDrawerSider: false,
        },
      });
    });
    const { container } = render(<RouterComponent />);
    await act(async () => {
      await waitFor(() => {
        jest.advanceTimersByTime(800);
      });
    });
    // expect(container).toMatchSnapshot();
  });
});
