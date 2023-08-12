import atomico from '@atomico/vite';
import svgr from "vite-plugin-svgr";
import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        target: 'modules',
        cssMinify: 'lightningcss'
    },
    css: {
        transformer: 'lightningcss',
        lightningcss:{
          browserslist: '>= 0.25%',
          drafts: {
              nesting: true,
              customMedia: true,
          },
          minify: true,
      }
    },
    plugins: [
        atomico({}),
        svgr()
    ],
});
