import jigsawstack from "@/lib/jigsawstack";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query, useInternet } = await req.json();

  try {
    const response = await jigsawstack.prompt_engine.run_prompt_direct({
      prompt: query,
      use_internet: useInternet,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in Ask API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
