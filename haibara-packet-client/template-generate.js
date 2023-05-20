module.exports = {
  page: (name, cssProcessor = 'css') => {
    return {
      parentName: 'pages',
      router: {
        dir: 'router/router.config.tsx',
        pathFormat: () => {
          const path = name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
          if (path.includes('-')) {
            return path.replace('-', '/');
          }
          return path;
        },
        defaultVariableName: 'routerConfig',
        // addRouterAfter: () => {
        // axios.get('https://api.github.com/users/LZS911').then((res) => {
        //   console.log(res);
        // });
        // },
      },
      [`${name}.tsx`]: () => {
        return `
          const ${name}:React.FC = () => {
            return (
              <div>
                ${name}
              </div>
            )
          }
          export default ${name};
        `;
      },
      'index.ts': () => {
        return `
          import ${name} from './${name}';
          
          export default ${name}
        `;
      },
      'docs.md': () => {
        return `# Generate ${name} page by gl-cli`;
      },
      [`__test__/${name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()}.test.tsx`]: () => {
        return `
          import ${name} from '..';
          import { render } from '@testing-library/react';
          describe('test ${name}', () => {
            it('should render ${name} to match snapshot', () => {
              const { container } = render(<${name} />);
              expect(container).toMatchSnapshot();
            })
          })
        `;
      },
    };
  },
  component: (name, cssProcessor = 'css') => {
    return {
      parentName: 'components',
      [`${name}.tsx`]: () => {
        return `
          import {I${name}Props} from '.';
          const ${name}:React.FC<I${name}Props> = ({className = ''}) => {
            return (
              <div className={className}>
                ${name}
              </div>
            )
          }
          export default ${name};
        `;
      },
      'index.ts': () => {
        return `
          import ${name} from './${name}';

          export interface I${name}Props {
            children?: React.ReactNode;
            className?: string;
          }
          
          export default ${name}
        `;
      },
      'docs.md': () => {
        return `# Generate ${name} component by gl-cli`;
      },
      [`__test__/${name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()}.test.tsx`]: () => {
        return `
          import ${name} from '..';
          import { render } from '@testing-library/react';
          describe('test ${name}', () => {
            it('should render ${name} to match snapshot', () => {
              const { container } = render(<${name} />);
              expect(container).toMatchSnapshot();
            })
          })
        `;
      },
    };
  },
};
