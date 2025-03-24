import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen p-8">
      <main className="flex flex-col gap-[32px] row-start-2">
        <h1 className="font-bold text-4xl">JigsawStack AI Assistant Tools</h1>
        <div className="flex justify-center items-center gap-4">
          <Link href="/web-scrape">
            <span className="text-2xl font-semibold bg-red-400 py-2 px-8 m-2 rounded-3xl text-gray-200 inline-block">
              Web Scraper
            </span>
          </Link>
          <Link href="/text-to-speech">
            <span className="text-2xl font-semibold bg-red-400 py-2 px-8 m-2 rounded-3xl text-gray-200 inline-block">
              Text To Speech
            </span>
          </Link>
          <Link href="/vocr">
            <span className="text-2xl font-semibold bg-red-400 py-2 px-8 m-2 rounded-3xl text-gray-200 inline-block">
              vOCR
            </span>
          </Link>
          <Link href="/chat-ai">
            <span className="text-2xl font-semibold bg-red-400 py-2 px-8 m-2 rounded-3xl text-gray-200 inline-block">
              Prompt Engine
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
