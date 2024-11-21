import { NextResponse } from "next/server";
import { NEXT_PUBLIC_NEBULA_URL } from "../../../../@/constants/env";
import { getAuthToken } from "../../lib/getAuthToken";
import { fetchWithAuthToken } from "../serverUtils";

export async function POST(request: Request) {
  if (!NEXT_PUBLIC_NEBULA_URL) {
    throw new Error("Nebula endpoint is not defined");
  }
  try {
    const body = await request.json();
    const { message, user_id, session_id, config } = body;

    const authToken = await getAuthToken();

    if (!authToken) {
      return NextResponse.json(
        { error: "Missing Auth token" },
        { status: 401 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Missing message parameter" },
        { status: 400 },
      );
    }

    try {
      const data = await fetchWithAuthToken({
        endpoint: `${NEXT_PUBLIC_NEBULA_URL}/execute`,
        body: { message, user_id, session_id, config },
        authToken,
        timeout: 120000, // 2 minute timeout for execute requests
      });

      return NextResponse.json(data);
    } catch (error: unknown) {
      console.error("Execute API Error:", error);
      if (error instanceof Error && error.message.includes("timed out")) {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 },
        );
      }
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch from API";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } catch (error) {
    console.error("Request Error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
