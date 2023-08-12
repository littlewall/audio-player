import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LW Audio Player",
  description: "Audio player web component with optional playlist/album view",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/install' },
      { text: 'Examples', link: '/examples' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Install', link: '/docs/install' },
          { text: 'Config', link: '/docs/config' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/littlewall/audio-player' }
    ]
  }
})
