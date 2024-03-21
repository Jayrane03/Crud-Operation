import { defineConfig } from 'vite';
import ViteReact from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  plugins: [ViteReact()],
  optimizeDeps: {
    exclude: ['buffer'], // Exclude 'buffer' module from optimization
  },
  server: {
    port: 5173, // Specify the port for Vite development server
  },
});
