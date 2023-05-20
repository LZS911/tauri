import { NavigateFunction } from 'react-router-dom';
import { routerConfig } from '../../../router/router.config';
import { INavIconList } from './index';
export const genNavIconList: (
  navigate: NavigateFunction
) => Array<INavIconList | null> = (navigate) => {
  return routerConfig.map((v) => {
    if (v.menuType === 'Hidden') {
      return null;
    }
    if (!v.children) {
      return {
        name: v.name,
        title: v.title,
        path: v.path,
        icon: v.icon,
        onClick: () => {
          navigate(v.path);
        },
      };
    }

    return {
      name: v.name,
      path: v.path,
      title: v.title,
      icon: v.icon,
      children: v.children.map((c) => {
        return {
          name: c.name,
          path: c.path,
          title: c.title,
          onClick: () => {
            navigate(c.path);
          },
        };
      }),
    };
  });
};
