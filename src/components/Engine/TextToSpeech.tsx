"use client";

import { AiOutlineSound, AiFillSound } from "react-icons/ai";
import { useState } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    try {
      setIsPlaying(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tts/english`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("TTS request failed");

      const data = await res.json();

      if (!data.audio) throw new Error("No audio URL returned from API");

      let audioUrl = data.audio;
      if (!audioUrl.startsWith("http")) {
        audioUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${audioUrl}`;
      }

      console.log("🎵 Audio URL:", audioUrl);

      const audio = new Audio(audioUrl);

      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
      });

      await audio.play();
    } catch (err) {
      console.error("TTS Error:", err);
      setIsPlaying(false);
    }
  };

  return (
    <button onClick={handlePlay}>
      {isPlaying ? (
        <AiFillSound className="text-[20px]" />
      ) : (
        <AiOutlineSound className="text-[20px]" />
      )}
    </button>
  );
};

export default TextToSpeech;
