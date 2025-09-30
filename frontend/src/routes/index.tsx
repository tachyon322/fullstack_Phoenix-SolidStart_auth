import { createSignal } from "solid-js";

export default function Home() {
  const [email, setEmail] = createSignal("user@example.com");
  const [password, setPassword] = createSignal("password123");
  const [output, setOutput] = createSignal("no data yet");

  const API_URL = "http://localhost:4000/api";

  async function handleLogin(e: Event) {
    e.preventDefault()
    const mail = email();
    const pwd = password();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: mail, password: pwd }),
      });

      if (!response.ok) {
        throw new Error(JSON.stringify(response));
      }

      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1>Enter your credentials</h1>
      <form
        onSubmit={handleLogin}
        class="flex gap-3 items-center justify-center"
      >
        <input
          type="email"
          class="border-1"
          placeholder="email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          class="border-1"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
        <button class="border-1 bg-amber-100" type="submit">
          submit
        </button>
      </form>

      <div class="mt-3">
        <h1>submitted data:</h1>
        <p>email: {email()}</p>
        <p>password: {password()}</p>
      </div>
      <p class="mt-3">server output: {output()}</p>
    </main>
  );
}
