export type ILWAudioPlayerSongPeaks = (Float32Array | number[])[];

export interface ILWAudioPlayerSong {
    id: string,
    url: string,
    cover?: string,
    title?: string,
    artist?: string,
    album?: string,
    playlist?: string,
    peaks?: ILWAudioPlayerSongPeaks,
}

export interface ILWAudioPlayerState {
    activeSong: {
        [playerId: string]: string,
    },
    songs: {
        [playerId: string]: {
            [songId: string]: ILWAudioPlayerSong,
        } | Record<string, never>,
    } | Record<string, never>,
}

export const setActiveSong = (
    state: ILWAudioPlayerState,
    {id, playerId}: {id: string; playerId: string},
) => {
    const {activeSong} = state;

    activeSong[playerId] = id;

    return {
        ...state,
        activeSong,
    };
};

export const setSongPeaks = (
    state: ILWAudioPlayerState,
    {id, playerId, peaks}: {id: string; playerId: string; peaks: ILWAudioPlayerSongPeaks},
) => {
    const {songs} = state;

    songs[playerId][id] = {
        ...songs[playerId][id],
        peaks,
    };

    return {
        ...state,
        songs,
    };
};

export const setSong = (
    state: ILWAudioPlayerState,
    songData: ILWAudioPlayerSong & {id: string; playerId: string},
) => {
    const {songs} = state;
    const {playerId, id: songId} = songData;

    if (!songs[playerId]) {
        songs[playerId] = {};
    }

    songs[playerId][songId] = {
        id: songId,
        ...songs[playerId][songId],
        ...songData,
    };

    return {
        ...state,
        songs,
    };
};
