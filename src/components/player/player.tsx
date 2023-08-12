/* eslint-disable import/no-duplicates */
import {
    c,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'atomico';
import {useStore} from '@atomico/store/hooks';
import {useSlot} from '@atomico/hooks/use-slot';
import WaveSurfer from 'wavesurfer.js';
import clsx from 'clsx';
import Store from '../../store';
import {Song} from '../components';
import {getWaveformConfig} from '../../helpers/waveform';
import styles from './player.module.css';
import rawStyles from './player.module.css?inline';

export interface ILWAudioPlayerProps {
    playlist?: string,
    artist?: string,
    cover?: string,
    defaultVolume?: number,
    primaryColor?: string,
}

const player = ({
    playlist,
    artist,
    cover,
    defaultVolume = 30,
    primaryColor = '#ffc107',
}) => {
    const playerId = useId();
    const store = useStore(Store);
    const slotRef = useRef();
    const waveContainerRef = useRef();
    const volumeSliderRef = useRef();
    const childNodes = useSlot(slotRef);
    const [,activeSongData] = Object
        .entries((store.state.songs[playerId] || {}))
        .find(([id]) => id === store.state.activeSong[playerId]) || [];
    const [isPlaying, setIsPlaying] = useState(false);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const albumPlaylistTitle = useMemo(
        () => (activeSongData?.album || activeSongData?.playlist),
        [activeSongData?.album, activeSongData?.playlist],
    );
    const playerSongIds = useMemo(
        () => Object.keys(store.state.songs[playerId] || {}),
        [store.state.songs[playerId]],
    );
    const isMultiSong = useMemo(
        () => playerSongIds.length > 1,
        [playerSongIds.length],
    );

    useEffect(() => {
        if (!childNodes) {
            return;
        }

        childNodes.forEach((node, index) => {
            const slotNode = node as typeof Song.prototype;
            const songData = {
                playerId,
                id: slotNode.id,
                url: slotNode.url,
                playlist: slotNode.playlist || playlist,
                artist: slotNode.artist || artist,
                cover: slotNode.cover || cover,
                title: slotNode.title,
            };

            store.actions.setSong(songData);

            slotNode.playerId = playerId;

            if (index === 0) {
                store.actions.setActiveSong({
                    playerId,
                    id: slotNode.id,
                });
            }
        });
    }, [childNodes]);

    useEffect(() => {
        let newVolume = defaultVolume;
        let newIsMuted = isMuted;

        if (wavesurfer) {
            newVolume = wavesurfer.getVolume();
            newIsMuted = wavesurfer.getMuted();

            wavesurfer.destroy();
        }

        const wavesurferInstance = WaveSurfer.create({
            ...getWaveformConfig({
                container: waveContainerRef.current,
                peaks: activeSongData?.peaks,
                url: activeSongData?.url,
                primaryColor,
            }),
        });

        setWavesurfer(wavesurferInstance);

        wavesurferInstance.on('ready', async () => {
            wavesurferInstance.setVolume(newVolume);
            wavesurferInstance.setMuted(newIsMuted);

            store.actions.setSongPeaks({
                id: activeSongData?.id,
                peaks: wavesurferInstance.exportPeaks(),
                playerId,
            });

            if (isPlaying) {
                await wavesurferInstance.play();
            }
        });

        wavesurferInstance.on('finish', () => {
            let newActiveSongId = playerSongIds[playerSongIds.indexOf(activeSongData?.id) + 1];

            if (!newActiveSongId) {
                setIsPlaying(false);
                wavesurfer.stop();
                wavesurfer.seekTo(0);

                [newActiveSongId] = playerSongIds;
            }

            store.actions.setActiveSong({
                playerId,
                id: newActiveSongId,
            });
        });

        return () => {
            wavesurferInstance.destroy();
        };
    }, [activeSongData?.id]);

    useEffect(() => {
        if (!volumeSliderRef.current || !wavesurfer) {
            return () => {};
        }

        const initialProgress = (defaultVolume / volumeSliderRef.current.max) * 100;

        volumeSliderRef.current.style.background = `linear-gradient(to right, ${primaryColor} ${initialProgress}%, #ccc ${initialProgress}%)`;

        volumeSliderRef.current.addEventListener('input', (event: InputEvent) => {
            const tempSliderValue = Number((event.target as HTMLInputElement).value);

            if (wavesurfer.getMuted() && tempSliderValue > 0) {
                wavesurfer.setMuted(false);
                setIsMuted(false);
            }

            wavesurfer.setVolume(tempSliderValue / 100);

            const progress = (tempSliderValue / volumeSliderRef.current.max) * 100;

            volumeSliderRef.current.style.background = `linear-gradient(to right, ${primaryColor} ${progress}%, #ccc ${progress}%)`;
        });

        return () => {
            volumeSliderRef.current.removeEventListener('input', () => {});
        };
    }, [volumeSliderRef.current, wavesurfer]);

    return (
        <host
            shadowDom
            style={{
                '--primary-color': primaryColor,
            }}
        >
            <style>{rawStyles}</style>
            <div className={styles.player}>
                <div className={styles.activeSong}>
                    <div className={styles.cover}>
                        <img
                            src={activeSongData?.cover}
                            alt={`${albumPlaylistTitle} cover`}
                        />
                    </div>
                    <div className={styles.song}>
                        <h5 className={styles.title}>
                            {activeSongData?.title}
                        </h5>
                        <span className={styles.artist}>
                            {activeSongData?.artist} {albumPlaylistTitle && ` • ${albumPlaylistTitle}`}
                        </span>
                        <div className={styles.waves} ref={waveContainerRef}/>
                        <div className={styles.controls}>
                            <button
                                className={styles.play}
                                onclick={async () => {
                                    await wavesurfer.playPause();

                                    setIsPlaying(!isPlaying);
                                }}
                            >
                                {
                                    isPlaying ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M8 5v14l11-7z"
                                            />
                                        </svg>
                                    )
                                }
                            </button>
                            <div className={styles.volume}>
                                <button
                                    className={styles.mute}
                                    onclick={() => {
                                        wavesurfer.setMuted(!isMuted);

                                        setIsMuted(!isMuted);
                                    }}
                                >
                                    {
                                        isMuted ? (
                                            // muted audio icon
                                            <svg
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="none"
                                                    d="M0 0h24v24H0z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M7 9v6h4l5 5V4l-5 5H7z"
                                                />
                                                <path d="M11 4v16h2V4h-2z" fill="currentColor"/>
                                            </svg>
                                        ) : (
                                            <svg
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="none"
                                                    d="M0 0h24v24H0z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M7 9v6h4l5 5V4l-5 5H7z"
                                                />
                                            </svg>
                                        )
                                    }
                                </button>
                                <input
                                    ref={volumeSliderRef}
                                    className={styles.volumeSlider}
                                    type="range"
                                    name="volume-slider"
                                    min="0"
                                    max="100"
                                    defaultValue={String(defaultVolume)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(
                    styles.playlist,
                    isMultiSong && styles.isMultisong,
                )}>
                    <slot name="song" ref={slotRef}/>
                </div>
            </div>
        </host>
    );
};

player.props = {
    playlist: {
        type: String,
        reflect: true,
    },
    artist: {
        type: String,
        reflect: true,
    },
    cover: {
        type: String,
        reflect: true,
    },
    defaultVolume: {
        type: Number,
        reflect: true,
    },
    primaryColor: {
        type: String,
        reflect: true,
    },
};

const Player = c(player);

export default Player;

customElements.define('lw-audio-player', Player);
