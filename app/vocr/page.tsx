"use client";

import { useState } from "react";
import Header from "../components/header";

export default function OCRPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [extractedText, setExtractedData] = useState({ text: [], tags: [] });

  const handleOCR = async () => {
    if (!imageUrl.trim() || !prompt.trim()) {
      alert("Please provide both an image URL and a prompt.");
      return;
    }

    const response = await fetch("/api/ocr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, prompt }),
    });

    const data = await response.json();
    // console.log(data);
    if (data.error) {
      alert("Error: " + data.error);
      return;
    }
    const { context, tags } = data;
    console.log(context[prompt]);
    setExtractedData({ text: data.context[prompt], tags });
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-start gap-4">
      <Header heading="Optical Character Recognition (OCR)" />

      <div className="w-full max-w-md">
        <label className="block mb-2 font-medium">Image URL:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label className="block mt-4 mb-2 font-medium">
          Prompt (Describe Text in Image):
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="E.g. Extract all visible text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleOCR}
          className="cursor-pointer w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Extract Text
        </button>
      </div>

      {extractedText && (
        <div className="mt-6 p-4 border rounded bg-gray-900 w-full max-w-md">
          <h2 className="text-lg font-semibold">Extracted Text:</h2>
          <p className="mt-2 flex flex-wrap">
            {extractedText?.text?.map((tag, index) => (
              <span
                key={index}
                className="text-nowrap rounded-2xl bg-gray-200 m-1 px-2 py-1 text-red-400"
              >
                {tag}
              </span>
            ))}
          </p>
          <h2 className="mt-6 text-lg font-semibold">Tags:</h2>
          <p className="mt-2 flex flex-wrap">
            {extractedText?.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-nowrap rounded-2xl bg-gray-200 m-1 px-2 py-1 text-red-400"
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
