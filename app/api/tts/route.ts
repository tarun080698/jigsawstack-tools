import { NextResponse } from 'next/server';
import jigsawstack from '@/lib/jigsawstack';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text input is required" }, { status: 400 });
    }

    const result = await jigsawstack.audio.text_to_speech({ text });

    if (!result) {
      return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 });
    }

    // Retrieve the generated audio file as a binary blob
    const audioBlob = await result.blob();

    return new Response(audioBlob, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error("Error in TTS API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
