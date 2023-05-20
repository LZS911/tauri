import { configureStore } from '@reduxjs/toolkit';
import userConfig from './userConfig';
import layout from './layout';
const store = configureStore({
  reducer: {
    userConfig,
    layout,
  },
});
export type IReduxState = ReturnType<typeof store.getState>;
export default store;
