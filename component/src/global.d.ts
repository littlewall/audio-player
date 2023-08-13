import {Song} from './components/components';

declare global {
    interface HTMLElementTagNameMap {
     'lw-audio-player-song': typeof Song,
   }
}
