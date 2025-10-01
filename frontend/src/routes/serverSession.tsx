import { createAsync, query } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

const API_URL = "http://localhost:4000/api";

const getSessionData = query(async () => {
  "use server";
  const event = getRequestEvent();
  const cookie = event?.request.headers.get("cookie");

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      ...(cookie && { Cookie: cookie }),
    },
  });

  if (!response.ok) {
    return "no session";
  }

  return response.json();
}, "session-data");

export default function test() {
  const sessionData = createAsync(() => getSessionData(), {
    deferStream: true,
  });

  return (
    <div class="">
      <div class="flex flex-col items-center justify-center space-y-3">
        <h1 class="text-xl">Server side session</h1>
        <h1>data: {JSON.stringify(sessionData())}</h1>
      </div>
    </div>
  );
}
