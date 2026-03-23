import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Dictionary Redefined',
    description: 'Instant pop-up definitions anywhere on the web. Double-click to see the definition.',
    permissions: ['storage'],
  },
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()]
  })
});
