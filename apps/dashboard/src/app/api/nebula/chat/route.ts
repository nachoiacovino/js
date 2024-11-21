import { NextResponse } from "next/server";
import { NEXT_PUBLIC_NEBULA_URL } from "../../../../@/constants/env";
import { getAuthToken } from "../../lib/getAuthToken";
import { fetchWithAuthToken } from "../serverUtils";

export async function POST(request: Request) {
  if (!NEXT_PUBLIC_NEBULA_URL) {
    throw new Error("Nebula endpoint is not defined");
  }

  try {
    const authToken = await getAuthToken();

    if (!authToken) {
      return NextResponse.json(
        { error: "Missing Auth token" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { message, user_id, session_id } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Missing message parameter" },
        { status: 400 },
      );
    }

    try {
      const data = await fetchWithAuthToken({
        endpoint: `${NEXT_PUBLIC_NEBULA_URL}/chat`,
        body: { message, user_id, session_id },
        authToken,
        timeout: 60000, // 1 minute timeout for chat requests
      });

      return NextResponse.json(data);
    } catch (error: unknown) {
      console.error(
        "Chat API Error:",
        error instanceof Error ? error.stack : error,
      );
      if (error instanceof Error && error.message.includes("timed out")) {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 },
        );
      }

      if (error instanceof Error && error.message.includes("401")) {
        return NextResponse.json(
          { error: "Invalid Authorization header" },
          { status: 401 },
        );
      }
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Failed to fetch from API",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(
      "Request Error:",
      error instanceof Error ? error.stack : error,
    );
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
