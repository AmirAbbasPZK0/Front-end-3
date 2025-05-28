'use client';

import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugins/microphone.esm.js';

export default function Waveform() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ccc',
      interact: false,
      cursorWidth: 0,
      plugins: [
        MicrophonePlugin.create({
          bufferSize: 1024,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: false,
            audio: true,
          },
        }),
      ],
    });

    wavesurfer.microphone.start();
    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.microphone.stop();
      wavesurfer.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-xl h-24 bg-black rounded" ref={waveformRef} />
  );
}
