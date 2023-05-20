import { QuestionOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useTheme from '../../../customHooks/useTheme';
import { routerConfig } from '../../../router/router.config';

const NavExpanded: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentThemeMode } = useTheme();
  const menuItems = useMemo((): MenuProps['items'] => {
    return routerConfig.map((v) => {
      if (v.menuType === 'Hidden') {
        return null;
      }
      if (v.children) {
        return {
          key: v.path,
          icon: v.icon ?? <QuestionOutlined />,
          label: t(v.title),
          children: v.children.map((c) => {
            return {
              key: c.path,
              label: c.name,
            };
          }),
        };
      }

      return {
        key: v.path,
        icon: v.icon ?? <QuestionOutlined />,
        label: t(v.title),
      };
    });
  }, [t]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const selectedKeys = useMemo(() => {
    return [location.pathname];
  }, [location]);

  return (
    <div className="flex flex-col">
      <div className="flex h-14 items-center pl-4">
        <img title="logo" src="/static/images/logo.svg" className="mr-3" />
        <span className="text-2xl text-black dark:text-white">
          {t('login.loginHeader.title')}
        </span>
      </div>

      <Menu
        theme={currentThemeMode}
        onClick={handleMenuClick}
        selectedKeys={selectedKeys}
        mode="inline"
        items={menuItems}
        className="text-base"
      />
    </div>
  );
};

export default NavExpanded;
