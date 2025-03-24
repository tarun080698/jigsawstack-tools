import { NextResponse } from "next/server";
import jigsawstack from "@/lib/jigsawstack";

export async function POST(req: Request) {
  try {
    const { url, prompts } = await req.json();
    const result = await jigsawstack.web.ai_scrape({
      url: url,
      element_prompts: prompts,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
