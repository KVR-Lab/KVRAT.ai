"use client";

import Link from "next/link";
import { Home, Folder, Bot, Cpu, Brain, MessageSquare, FileText, Settings } from "lucide-react";

const items = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/projects", label: "المشاريع", icon: Folder },
  { href: "/agents", label: "الوكلاء", icon: Bot },
  { href: "/runtime", label: "المحرك", icon: Cpu },
  { href: "/memory", label: "الذاكرة", icon: Brain },
  { href: "/chat", label: "الدردشة", icon: MessageSquare },
  { href: "/logs", label: "السجل", icon: FileText },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        background: "#111827",
        color: "#fff",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <h2 style={{ marginBottom: 30 }}>KVR-Core</h2>

      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#fff",
            textDecoration: "none",
            padding: "12px 10px",
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </aside>
  );
}