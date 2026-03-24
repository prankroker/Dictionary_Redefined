import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Dictionary Redefined',
    description: 'Instant pop-up definitions anywhere on the web. Double-click to see the definition.',
    permissions: ['storage'],
    icons:{
      "16": "icon/16icon.png",
      "48": "icon/48icon.png",
      "96": "icon/96icon.png",
      "128": "icon/128icon.png",
    }
  },
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()]
  })
});
