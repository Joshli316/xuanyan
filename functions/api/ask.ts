/**
 * XuanYan API Proxy — Cloudflare Pages Function
 * POST /api/ask → forwards to Claude API
 *
 * Environment variable required (set in CF Pages dashboard):
 *   ANTHROPIC_API_KEY
 */

interface Env {
  ANTHROPIC_API_KEY: string;
}

interface AskRequest {
  system: string;
  user: string;
}

// Simple in-memory rate limiter: 10 requests per minute per IP (best-effort, resets per isolate)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Evict entries outside the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

// Periodic cleanup to prevent memory growth (every 1000 checks)
let checkCount = 0;
function maybeCleanup(): void {
  checkCount++;
  if (checkCount % 1000 !== 0) return;
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // --- Guard: API key configured ---
  if (!env.ANTHROPIC_API_KEY) {
    return jsonResponse({ error: "Server misconfiguration: missing API key" }, 500);
  }

  // --- Rate limiting ---
  maybeCleanup();
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (isRateLimited(ip)) {
    return jsonResponse({ error: "Rate limit exceeded. Try again in a minute." }, 429);
  }

  // --- Content-Type check ---
  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Content-Type must be application/json" }, 415);
  }

  // --- Parse body ---
  let body: AskRequest;
  try {
    body = await request.json<AskRequest>();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body.system || typeof body.system !== "string") {
    return jsonResponse({ error: "Missing or invalid 'system' field" }, 400);
  }
  if (!body.user || typeof body.user !== "string") {
    return jsonResponse({ error: "Missing or invalid 'user' field" }, 400);
  }

  // --- Limit input size (prevent abuse) ---
  if (body.system.length > 10_000) {
    return jsonResponse({ error: "System prompt too long (max 10,000 chars)" }, 400);
  }
  if (body.user.length > 5_000) {
    return jsonResponse({ error: "User message too long (max 5,000 chars)" }, 400);
  }

  // --- Call Claude API ---
  let anthropicResponse: Response;
  try {
    anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: body.system,
        messages: [{ role: "user", content: body.user }],
      }),
    });
  } catch (err) {
    return jsonResponse({ error: "Failed to reach Claude API" }, 502);
  }

  // --- Handle Claude API errors ---
  if (!anthropicResponse.ok) {
    const status = anthropicResponse.status;
    // Don't leak internal error details to client
    if (status === 401) {
      return jsonResponse({ error: "Server authentication error" }, 500);
    }
    if (status === 429) {
      return jsonResponse({ error: "AI service is busy. Please try again shortly." }, 429);
    }
    if (status === 529) {
      return jsonResponse({ error: "AI service is temporarily overloaded. Please try again later." }, 503);
    }
    return jsonResponse({ error: "AI service error" }, 502);
  }

  // --- Parse Claude response ---
  let claudeBody: {
    content?: Array<{ type: string; text?: string }>;
    error?: { message?: string };
  };
  try {
    claudeBody = await anthropicResponse.json();
  } catch {
    return jsonResponse({ error: "Invalid response from AI service" }, 502);
  }

  const textBlock = claudeBody.content?.find((block) => block.type === "text");
  if (!textBlock?.text) {
    return jsonResponse({ error: "No text in AI response" }, 502);
  }

  return jsonResponse({ response: textBlock.text });
};
