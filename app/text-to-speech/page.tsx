"use client";

import { useState } from "react";
import Header from "../components/header";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleTTS = async () => {
    const response = await fetch("/api/tts", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      alert("Error generating speech");
      return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-start gap-4">
      <Header heading="Text To Speech" />
      <div className="flex justify-center items-center gap-8 w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="border-2 rounded-xl p-4 w-full"
        />
        <button
          onClick={handleTTS}
          className="bg-red-400 text-2xl p-3 rounded-xl"
        >
          Convert
        </button>
      </div>
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  );
}
