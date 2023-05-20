import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import HeaderProgress from '../components/HeaderProgress';
import { I18nKeyType } from '../typing/common.type';
import RouterComponent from './Router';

export default RouterComponent;

export type MenuType = 'Authentication' | 'SASS' | 'Other' | 'Hidden';
export interface RouterItem {
  path: string;
  name: string;
  title: I18nKeyType;
  element?: React.LazyExoticComponent<React.FC>;
  icon?: JSX.Element;
  children?: Array<RouterItem>;
  menuType?: MenuType;
}

export const registerRouter = (
  pages: RouterItem[]
): Array<JSX.Element | null> => {
  return pages.reduce<Array<JSX.Element | null>>((acc, cur) => {
    if (cur.element) {
      return [
        ...acc,
        <Route
          path={cur.path}
          key={cur.name}
          element={
            <Suspense fallback={<HeaderProgress />}>
              <cur.element />
            </Suspense>
          }
        />,
      ];
    }

    if (cur.children?.length) {
      return [...acc, ...registerRouter(cur.children)];
    }

    return [];
  }, []);
};
