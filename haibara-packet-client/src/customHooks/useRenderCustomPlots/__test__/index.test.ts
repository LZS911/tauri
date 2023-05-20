import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorSchemeEnum, ThemeModeEnum } from '../../../common/enum';
import { SupportLanguage } from '../../../locale';
import useRenderCustomPlots from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe('test useRenderCustomPlots', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => {});
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          lang: SupportLanguage.enUS,
          currentThemeMode: ThemeModeEnum.Light,
          currentColorScheme: ColorSchemeEnum.Blue,
        },
      });
    });
  });
  test('should match snapshot', () => {
    const { result } = renderHook(() => useRenderCustomPlots());

    expect(result.current).toMatchSnapshot();
  });
});
