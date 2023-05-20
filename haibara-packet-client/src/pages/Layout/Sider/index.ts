import Sider from './Sider';
export interface INavIconList {
  name: string;
  path: string;
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
  children?: Array<Omit<INavIconList, 'icon' | 'children'>>;
}

export default Sider;
