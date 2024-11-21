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
    const { session_id, config = {}, action } = body;

    if (action === "create_session") {
      const requestBody = {
        can_execute: !!config,
        config,
      };

      const data = await fetchWithAuthToken({
        endpoint: `${NEXT_PUBLIC_NEBULA_URL}/session`,
        body: requestBody,
        authToken,
      });

      return NextResponse.json(data);
    }

    if (action === "update_session") {
      if (!session_id) {
        return NextResponse.json(
          { error: "Missing session_id for update" },
          { status: 400 },
        );
      }

      const requestBody = {
        can_execute: !!config,
        config,
      };

      const data = await fetchWithAuthToken({
        endpoint: `${NEXT_PUBLIC_NEBULA_URL}/session/${session_id}`,
        method: "PUT",
        body: requestBody,
        authToken,
      });

      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Session API Error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
