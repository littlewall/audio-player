import {WaveSurferOptions} from 'wavesurfer.js';
import {ILWAudioPlayerSongPeaks} from '../actions';
import {adjustHexColor} from './color';

const getGradients = (primaryColor: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);

    gradient.addColorStop(0, '#656666');
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666');
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff');
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff');
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1');
    gradient.addColorStop(1, '#B1B1B1');

    const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);

    progressGradient.addColorStop(0, adjustHexColor(primaryColor, 20));
    progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, primaryColor);
    progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff');
    progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff');
    progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, adjustHexColor(primaryColor, 80));
    progressGradient.addColorStop(1, adjustHexColor(primaryColor, 80));

    return ({
        gradient,
        progressGradient,
    });
};

// eslint-disable-next-line import/prefer-default-export
export const getWaveformConfig = ({
    container,
    peaks,
    url,
    primaryColor,
}: {
    container: HTMLElement,
    peaks: ILWAudioPlayerSongPeaks,
    url: string,
    primaryColor: string,
}) => {
    const {gradient, progressGradient} = getGradients(primaryColor);

    const config: WaveSurferOptions = {
        container,
        waveColor: gradient,
        progressColor: progressGradient,
        barWidth: 2,
        height: 30,
        normalize: true,
        peaks,
        url,
    };

    if (peaks) {
        config.peaks = peaks;
    }

    return config;
};
