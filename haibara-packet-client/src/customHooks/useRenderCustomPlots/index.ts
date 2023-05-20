import { Options } from '@ant-design/plots';
import useLanguage from '../useLanguage';
import useTheme, { getCurrentColorSchemeStrings } from '../useTheme';

const useRenderCustomPlots: () => Pick<
  Options,
  'color' | 'locale' | 'theme'
> & { className: string } = () => {
  const { isDark, currentColorScheme, currentThemeMode } = useTheme();
  const { currentLanguage } = useLanguage();
  const [color] = getCurrentColorSchemeStrings(isDark, currentColorScheme);
  const className =
    'rounded-md border border-stone-200 p-5 dark:border-stone-700 dark:bg-darkMode bg-white';

  return {
    color,
    className,
    locale: currentLanguage,
    theme: currentThemeMode,
  };
};

export default useRenderCustomPlots;
