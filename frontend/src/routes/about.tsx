import { createResource, Show, Suspense } from "solid-js";
import { useNavigate } from "@solidjs/router";

const API_URL = "http://localhost:4000/api";

// Get current user (protected route)
const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    credentials: 'include', // This is crucial - it sends cookies
  });
  
  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

export default function About() {
  const navigate = useNavigate();
  const [user] = createResource(getCurrentUser);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="text-2xl font-bold mb-4">Protected Page</h1>
      
      <Suspense fallback={<div>Loading user data...</div>}>
        <Show
          when={!user.error}
          fallback={
            <div class="text-red-600">
              <p>Authentication required</p>
              <p class="text-sm mt-2">{user.error?.message}</p>
              <button
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate("/")}
              >
                Go to Login
              </button>
            </div>
          }
        >
          <div class="bg-green-50 p-4 rounded">
            <h2 class="text-xl mb-2">Welcome!</h2>
            <div class="text-left max-w-md mx-auto">
              <p class="mb-2"><strong>User ID:</strong> {user()?.user?.id}</p>
              <p class="mb-2"><strong>Email:</strong> {user()?.user?.email}</p>
              <pre class="bg-gray-100 p-3 rounded text-xs overflow-auto">
                {JSON.stringify(user(), null, 2)}
              </pre>
            </div>
          </div>
        </Show>
      </Suspense>
    </main>
  );
}
