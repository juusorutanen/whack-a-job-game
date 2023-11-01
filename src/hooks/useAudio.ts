import { useState, useEffect } from 'react';

const useAudio = (src: string, volume: number = 1) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const AUDIO = new Audio(src);
        AUDIO.volume = volume;
        setAudio(AUDIO);
    }, [src]);

    return {
        play: () => audio!.play(),
        pause: () => audio!.pause(),
        stop: () => {
            audio!.pause();
            audio!.currentTime = 0;
        },
    };
};

export default useAudio;