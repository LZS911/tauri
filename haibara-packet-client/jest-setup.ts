import '@testing-library/jest-dom';
import 'jsdom-worker';
import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'jest-canvas-mock';

import React from 'react';
global.React = React;
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  // debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: { en: { translations: {} } },
});
