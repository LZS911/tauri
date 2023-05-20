import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginESLint from 'vite-plugin-eslint';
import createImportPlugin from 'vite-plugin-import';
import vitePluginConditionalCompile from 'vite-plugin-conditional-compile';
import vitePluginVisualizer from 'rollup-plugin-visualizer';
import viteWatchI18n from 'vite-plugin-watch-i18';

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const isDebug = config.mode === 'development';
  const isProduction = config.mode === 'production';
  const plugins = [
    vitePluginConditionalCompile({
      isDebug,
      expand: {
        isProduction,
      },
    }),
    react(),
    vitePluginESLint(),
    viteWatchI18n(),
    createImportPlugin({
      onlyBuild: true,
      babelImportPluginOptions: [
        {
          libraryName: 'antd',
          style: 'css',
        },
        {
          libraryName: 'lodash',
          camel2DashComponentName: false,
        },
        {
          libraryName: '@ant-design/plots/components',
          libraryDirectory: 'es',
        },
      ],
    }),
  ];
  if (isProduction) {
    plugins.push(
      vitePluginVisualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as any
    );
  }
  return {
    base: '/',
    plugins,
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
    minify: 'terser',
    brotliSize: false,
    server: {
      proxy: {
        '/v': 'http://172.25.0.2:7878/',
      },
    },
    rollupOptions: {
      plugins: [],
      rollupOptions: {
        output: {
          manualChunks: {
            lodash: ['lodash'],
            antd: ['antd'],
            antCharts: ['@ant-design/plots'],
          },
        },
      },
    },
  };
});
