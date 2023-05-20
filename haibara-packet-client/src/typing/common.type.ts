type DictionaryValue = string | number | boolean | Dictionary;
export interface Dictionary {
  [key: string]: DictionaryValue;
}
export interface StringDictionary {
  [key: string]: string;
}
export type ModalState = {
  [key: string]: boolean;
};

export type I18nKeyType = string;

export interface IColorSchemeKey {
  primary: string;
  secondary: string;
  darkPrimary: string;
  darkSecondary: string;
}
