const API = "http://localhost:4000";

export async function getControlCenter() {
  const res = await fetch(`${API}/control-center`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load Control Center");
  }

  return res.json();
}