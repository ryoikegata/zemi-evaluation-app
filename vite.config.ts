import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": "/app",
    },
  },
  build: {
    rollupOptions: {
      external: [
        'mock-aws-s3',
        'aws-sdk',
        'nock',
        '@mapbox/node-pre-gyp' // 外部化するパッケージ
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      'mock-aws-s3',
      'aws-sdk',
      'nock',
      '@mapbox/node-pre-gyp' // 開発サーバーでも外部化
    ]
  }
});
