import { Drawer } from 'antd';
import { useMemo } from 'react';
import CONSTANT from '../../../common/constant';
import ThemeBase from '../../../components/ThemeBase';
import useLayoutRedux from '../useLayoutRedux';
import NavExpanded from './NavExpanded';
import NavNotExpanded from './NavNotExpanded';

const Sider: React.FC = () => {
  const { isExpandSider, isDrawerSider, setIsExpandSider } = useLayoutRedux();

  const closeDrawerSider = () => {
    setIsExpandSider(false);
  };

  const siderWidth = useMemo(() => {
    if (isDrawerSider) {
      return 0;
    }

    if (isExpandSider) {
      return CONSTANT.SIDER_WIDTH_WHEN_EXPAND;
    }

    return CONSTANT.SIDER_WIDTH;
  }, [isDrawerSider, isExpandSider]);
  return (
    <nav
      className="sticky top-0 h-full overflow-y-auto transition-[width]"
      style={{
        width: siderWidth,
      }}
    >
      {isDrawerSider ? (
        <Drawer
          closable={false}
          placement="left"
          visible={isExpandSider}
          onClose={closeDrawerSider}
          bodyStyle={{
            padding: 0,
            width: CONSTANT.SIDER_WIDTH_WHEN_EXPAND,
          }}
          contentWrapperStyle={{
            width: CONSTANT.SIDER_WIDTH_WHEN_EXPAND,
          }}
        >
          <ThemeBase.Paper className="h-full w-full">
            <NavExpanded />
          </ThemeBase.Paper>
        </Drawer>
      ) : (
        <ThemeBase.Paper className="h-full w-full">
          {isExpandSider ? <NavExpanded /> : <NavNotExpanded />}
        </ThemeBase.Paper>
      )}
    </nav>
  );
};

export default Sider;
