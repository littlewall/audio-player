# lw-audio-player

Audio player web component with optional playlist/album view

[![package-badge]][package]
[![jsdelivr-badge]][jsdelivr]

## Screenshot
![LW Audio Player](lw-audio-player.png)

## Docs
You can find documentation at [audio-player.littlewall.dev](https://audio-player.littlewall.dev)

## Quick start

```html
<script src="https://cdn.jsdelivr.net/npm/@lwdev/audio-player@latest" type="module"></script>

<lw-audio-player>
    <lw-audio-player-song
        artist="Milan Zítka"
        album="Yellow World (EP, 2023)"
        cover="/images/yellow-world.jpg"
        url="/audio/milan-zitka_yellow_world.mp3"
        title="Yellow World"
    ></lw-audio-player-song>
</lw-audio-player>
```

## v1.0 checklist
* [x] core functions
* [ ] better design
* [ ] assets lazyload
* [ ] separate CDN and npm build
* [ ] finished documentation

## License

MIT License.

[package]: https://www.npmjs.com/package/@lwdev/audio-player
[package-badge]: https://img.shields.io/npm/v/@lwdev/audio-player?style=flat-square
[jsdelivr]: https://www.jsdelivr.com/package/npm/@lwdev/audio-player
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/@lwdev/audio-player/badge
