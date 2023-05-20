import zhCN from './zh-CN';
import enUS from './en-US';
import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocalStorageWrapper from '../utils/LocalStorageWrapper';
import { Dictionary } from '../typing/common.type';
import CONSTANT from '../common/constant';

enum SupportLanguage {
  zhCN = 'zh',
  enUS = 'en',
}

i18n.use(initReactI18next).init({
  resources: {
    [SupportLanguage.zhCN]: zhCN,
    [SupportLanguage.enUS]: enUS,
  },
  lng: LocalStorageWrapper.getOrDefault(
    CONSTANT.LANGUAGE_STORAGE_KEY,
    SupportLanguage.zhCN
  ),
  fallbackLng: SupportLanguage.zhCN,
  interpolation: {
    escapeValue: false,
  },
});

const translation = (key: string, dic?: Dictionary) => {
  return i18n.t(key, dic);
};

export { SupportLanguage, translation };
export default i18n;
