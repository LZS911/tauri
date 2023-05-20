import RouterComponent from './router';
import { ConfigProvider, theme } from 'antd';
import useTheme, {
  getCurrentColorSchemeStrings,
  useInitTheme,
} from './customHooks/useTheme';
import { useInitFontFamily } from './customHooks/useFontFamily';
import useLanguage from './customHooks/useLanguage';

function App() {
  const { isDark, currentColorScheme } = useTheme();
  const [primaryColor] = getCurrentColorSchemeStrings(
    isDark,
    currentColorScheme
  );

  useInitTheme();
  useInitFontFamily();

  const { antdLocale } = useLanguage();

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterComponent />
    </ConfigProvider>
  );
}

export default App;
