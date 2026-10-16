"use client";

import { useEffect, useState } from "react";
import { getControlCenter } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [command, setCommand] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // استخدام متغير البيئة للرابط أو العودة لرابط افتراضي
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function loadStatus() {
    try {
      setError(null);
      const status = await getControlCenter();
      setData(status);
    } catch (err: any) {
      console.error("Failed to load status:", err);
      setError("تعذر الاتصال بـ KVR-Core Backend. يرجى التحقق من متغيرات البيئة.");
    } finally {
      setLoading(false); // خروج حتمي من شاشة التحميل مهما كانت النتيجة
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function executeCommand() {
    if (!command.trim()) return;

    setBusy(true);

    try {
      const response = await fetch(`${API_BASE_URL}/planner/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: command.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Planner request failed");
      }

      const result = await response.json();
      alert(`Task queued\n\nID: ${result.id}`);
      console.log(result);
      setCommand("");
      await loadStatus();
    } catch (err) {
      console.error(err);
      alert("Failed to send command. Check API connection.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, fontFamily: "Arial", background: "#0f172a", color: "white", minHeight: "100vh" }}>
        جارٍ تحميل KVR-Core...
      </div>
    );
  }

  return (
    <main
      style={{
        padding: 30,
        fontFamily: "Arial",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>KVR-Core Control Center</h1>

      {error && (
        <div style={{ padding: 12, background: "#7f1d1d", border: "1px solid #ef4444", borderRadius: 6, marginBottom: 20 }}>
          ⚠️ {error}
        </div>
      )}

      <hr />

      <h2>System</h2>
      <p><strong>Name:</strong> {data?.system?.name || "KVR-Core (Offline)"}</p>
      <p><strong>Status:</strong> {data?.system?.status || "Disconnected"}</p>

      <hr />

      <h2>Runtime</h2>
      <p><strong>Loop:</strong> {data?.runtime?.loop || "N/A"}</p>
      <p><strong>Planner:</strong> {data?.runtime?.planner || "N/A"}</p>
      <p><strong>Executor:</strong> {data?.runtime?.executor || "N/A"}</p>

      <hr />

      <h2>Command Console</h2>
      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter KVR command..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            executeCommand();
          }
        }}
        style={{
          width: "70%",
          padding: "10px",
          borderRadius: "6px",
          marginRight: "10px",
          color: "black",
        }}
      />

      <button
        onClick={executeCommand}
        disabled={busy}
        style={{
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        {busy ? "Running..." : "Execute"}
      </button>

      <hr />

      <h2>Projects</h2>
      {data?.projects?.length ? (
        data.projects.map((p: any) => (
          <div
            key={p.id}
            style={{
              marginBottom: 15,
              padding: 12,
              border: "1px solid #334155",
              borderRadius: 6,
            }}
          >
            <h3>{p.name}</h3>
            <div>{p.path}</div>
            <div>Status: {p.status}</div>
          </div>
        ))
      ) : (
        <div>No active projects loaded.</div>
      )}

      <hr />

      <h2>Agents</h2>
      {data?.agents?.length ? (
        data.agents.map((a: any) => (
          <div key={a.name} style={{ marginBottom: 8 }}>
            {a.name} — {a.status}
          </div>
        ))
      ) : (
        <div>No agents online.</div>
      )}
    </main>
  );
}
