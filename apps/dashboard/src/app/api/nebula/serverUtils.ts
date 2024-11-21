interface FetchWithKeyOptions {
  endpoint: string;
  body: Record<string, unknown>;
  authToken: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  timeout?: number;
}

export async function fetchWithAuthToken({
  endpoint,
  body,
  authToken,
  method = "POST",
  timeout = 30000, // 30 second default timeout
}: FetchWithKeyOptions) {
  console.log("Sending request to:", endpoint);
  console.log("Request method:", method);
  console.log("Request body:", body);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 504) {
        throw new Error("Request timed out. Please try again.");
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
