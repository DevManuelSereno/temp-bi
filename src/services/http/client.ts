/* ── HTTP Client abstraction ─────────────────────────
   Today: placeholder that returns mock data via services.
   Tomorrow: replace with real fetch/axios client.
   ──────────────────────────────────────────────────── */

interface RequestConfig {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function httpClient<T>(
    endpoint: string,
    config: RequestConfig = {}
): Promise<T> {
    const { method = "GET", headers = {}, body } = config;

    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}
