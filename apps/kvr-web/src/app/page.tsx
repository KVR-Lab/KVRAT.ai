"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({
    system: { name: "Nail Golden & KVRAT.ai", status: "Online (Cloud Mode)" },
    runtime: { loop: "Active", planner: "Ready", executor: "Idle" },
    projects: [
      { id: "1", name: "KVRAT.ai Core", path: "/apps/kvrat-ai", status: "Operational" }
    ],
    agents: [
      { name: "PlannerAgent", status: "Ready" },
      { name: "GrowthAgent", status: "Standby" }
    ]
  });
  const [command, setCommand] = useState("");
  const [busy, setBusy] = useState(false);

  async function executeCommand() {
    if (!command.trim()) return;
    setBusy(true);
    try {
      alert(`Task queued successfully: ${command}`);
      setCommand("");
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(false);
    }
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
      <h1>Nail Golden & KVRAT.ai Control Center</h1>
      <hr />

      <h2>System</h2>
      <p><strong>Name:</strong> {data.system.name}</p>
      <p><strong>Status:</strong> {data.system.status}</p>
      <hr />

      <h2>Runtime</h2>
      <p><strong>Loop:</strong> {data.runtime.loop}</p>
      <p><strong>Planner:</strong> {data.runtime.planner}</p>
      <p><strong>Executor:</strong> {data.runtime.executor}</p>
      <hr />

      <h2>Command Console</h2>
      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter KVR command..."
        onKeyDown={(e) => {
          if (e.key === "Enter") executeCommand();
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
      {data.projects.map((p: any) => (
        <div key={p.id} style={{ marginBottom: 15, padding: 12, border: "1px solid #334155", borderRadius: 6 }}>
          <h3>{p.name}</h3>
          <div>{p.path}</div>
          <div>Status: {p.status}</div>
        </div>
      ))}
      <hr />

      <h2>Agents</h2>
      {data.agents.map((a: any) => (
        <div key={a.name} style={{ marginBottom: 8 }}>
          {a.name} — {a.status}
        </div>
      ))}
    </main>
  );
}
