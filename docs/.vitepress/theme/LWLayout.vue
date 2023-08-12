<script setup>
  import DefaultTheme from 'vitepress/theme';
  import "https://cdn.jsdelivr.net/npm/@lwdev/audio-player@latest";

  const {Layout} = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <lw-audio-player
            artist="Milan Zítka"
            cover="/images/yellow-world.jpg"
            playlist="Yellow World (EP, 2023)"
            style="z-index: 100;"
        >
            <lw-audio-player-song
                url="/audio/milan-zitka_yellow_world.mp3"
                title="Yellow World"
            ></lw-audio-player-song>
        </lw-audio-player>    
      </template>
  </Layout>
</template>
