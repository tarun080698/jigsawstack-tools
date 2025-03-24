"use client";
import { useState } from "react";
import Header from "../components/header";

export default function WebScrapePage() {
  const [url, setUrl] = useState("");
  const [prompts, setPrompts] = useState("");
  const [result, setResult] = useState([]);

  const handleScrape = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/scrape", {
      method: "POST",
      body: JSON.stringify({
        url,
        prompts: prompts.replaceAll(" ", "").split(","),
      }),
    });
    const data = await response.json();
    console.log({ data });
    setResult(data?.data);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-start gap-4">
      <Header heading="AI Web Scraper" />

      <form
        onSubmit={handleScrape}
        className="flex justify-center items-center gap-8 w-full"
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          className="border-2 rounded-xl p-4 w-full"
        />
        <input
          type="text"
          value={prompts}
          onChange={(e) => setPrompts(e.target.value)}
          placeholder="Enter prompts, comma seperated E.g. name,titles..."
          required
          className="border-2 rounded-xl p-4 w-full"
        />
        <button
          type="submit"
          // onClick={handleScrape}
          className="bg-red-400 text-2xl p-3 rounded-xl"
        >
          Scrape
        </button>
      </form>
      {result &&
        result?.map(({ key, results = [] }, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold ">
              {key} ({results.length})
            </h2>
            <ul className="flex flex-wrap">
              {results.map(({ text }, index) => (
                <li
                  key={index}
                  className="text-nowrap rounded-2xl bg-gray-200 m-1 px-2 py-1 text-red-400"
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
