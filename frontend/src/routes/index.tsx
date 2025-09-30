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

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="text-2xl font-bold mb-6">Login</h1>
      
      {/* Google OAuth Login */}
      <div class="mb-8">
        <button
          onClick={handleGoogleLogin}
          class="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 mx-auto"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or login with email</span>
        </div>
      </div>

      {/* Email/Password Login */}
      <form
        onSubmit={handleLogin}
        class="flex flex-col gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          class="border-1 px-3 py-2 rounded"
          placeholder="email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          class="border-1 px-3 py-2 rounded"
          placeholder="password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
        <button class="border-1 bg-amber-100 px-4 py-2 rounded hover:bg-amber-200" type="submit">
          Login with Email
        </button>
      </form>

      <div class="mt-6">
        <h2 class="font-semibold mb-2">Debug Info:</h2>
        <p class="text-sm">email: {email()}</p>
        <p class="text-sm">password: {password()}</p>
        <pre class="mt-3 text-xs bg-gray-100 p-3 rounded overflow-auto max-w-md mx-auto text-left">
          {output()}
        </pre>
      </div>
    </main>
  );
}
