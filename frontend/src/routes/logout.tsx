export default function logout() {
  const logout = async () => {
    const response = await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include", // This is crucial - it sends cookies
    });

    const data = await response.json();
    return data;
  };
  return (
    <div>
      <button onClick={logout} class="bg-amber-200 border-1">logout</button>
    </div>
  );
}
