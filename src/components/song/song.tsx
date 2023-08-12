/* eslint-disable import/no-duplicates */
import {useStore} from '@atomico/store/hooks';
import {
    c,
    Component,
    useEffect,
    useId,
    useProp,
} from 'atomico';
import Store from '../../store';
import styles from './song.module.css';
import rawStyles from './song.module.css?inline';

export interface ILWAudioPlayerSongProps {
    url: string,
    title: string,
    id: string,
    playerId: string,
}

const song: Component<ILWAudioPlayerSongProps> = ({playerId}) => {
    const songId = useId();
    const [, setId] = useProp('id');
    const store = useStore(Store);
    const [,songData] = Object
        .entries((store.state.songs[playerId] || {}))
        .find(([id]) => id === songId) || [];

    useEffect(() => {
        if (!songId || songId === 'id') {
            return;
        }

        setId(songId);
    }, [songId]);

    return (
        <host slot="song" shadowDom>
            <style>{rawStyles}</style>
            <div
                className={styles.song}
                onclick={() => {
                    store.actions.setActiveSong({
                        playerId,
                        id: songId,
                    });
                }}
            >
                <div className={styles.cover}>
                    <img src={songData?.cover} alt=""/>
                </div>
                <div className={styles.info}>
                    <h5 className={styles.title}>
                        {songData?.title} - {songData?.artist}
                    </h5>
                </div>
            </div>
        </host>
    );
};

song.props = {
    url: {
        type: String,
        value: '',
        reflect: true,
    },
    title: {
        type: String,
        reflect: true,
    },
    id: {
        type: String,
    },
    playerId: {
        type: String,
    },
};

const Song = c(song);

export default Song;

customElements.define('lw-audio-player-song', Song);
