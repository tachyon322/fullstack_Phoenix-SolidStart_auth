export default function Logout() {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include", // This is crucial - it sends cookies
      });

      await response.json();

      // Reload the page after successful logout
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div>
      <button onClick={handleLogout} class="bg-amber-200 border-1 m-3 p-2">
        logout
      </button>
    </div>
  );
}
