import { NextResponse } from "next/server";
import jigsawstack from "@/lib/jigsawstack";

export async function POST(req: Request) {
  try {
    const { imageUrl, prompt } = await req.json();
    const result = await jigsawstack.vision.vocr({
      url: imageUrl,
      prompt: [prompt],
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
