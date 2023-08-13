import atomico from '@atomico/vite';
import svgr from "vite-plugin-svgr";
import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    build: {
        target: 'modules',
        cssMinify: 'lightningcss',
        minify: true,
        lib: {
            entry: resolve(__dirname, 'src/components/components.ts'),
            name: 'LWAudioPlayer',
            fileName: 'lw-audio-player',
            formats: ['es'],
        },
    },
    css: {
        transformer: 'lightningcss',
        lightningcss: {
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
