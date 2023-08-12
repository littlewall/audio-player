import {createStore} from '@atomico/store';
import type {ILWAudioPlayerState} from './actions';
import {setActiveSong, setSong, setSongPeaks} from './actions';

const defaultState: ILWAudioPlayerState = {
    activeSong: {},
    songs: {},
};

const store = createStore(
    defaultState,
    {
        setActiveSong,
        setSong,
        setSongPeaks,
    },
);

export default store;
