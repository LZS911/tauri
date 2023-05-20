import { ILayoutProps } from '.';
import ThemeBase from '../../components/ThemeBase';
import Header from './Header';
import Main from './Main';
import Sider from './Sider';
import useResizeObserver from 'use-resize-observer';
import useLayoutRedux from './useLayoutRedux';
import useThrottle from '../../hooks/useThrottle';

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { setIsDrawerSider } = useLayoutRedux();
  const headerWidthObserver = useThrottle(
    ({ width = 0 }: { width?: number }) => {
      if (width < 1000) {
        setIsDrawerSider(true);
      } else {
        setIsDrawerSider(false);
      }
    },
    [],
    200
  );
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: headerWidthObserver,
  });
  return (
    <ThemeBase.Paper className="flex min-h-full w-full">
      <Sider />
      <div ref={ref} className="flex-auto transition-[width]">
        <Header />
        <Main>{children}</Main>
      </div>
    </ThemeBase.Paper>
  );
};

export default Layout;
