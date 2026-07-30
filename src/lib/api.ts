const API = "http://localhost:3000";

export async function dashboard() {
  const res = await fetch(`${API}/control/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("تعذر الاتصال بـ KVR-Core");
  }

  return res.json();
}