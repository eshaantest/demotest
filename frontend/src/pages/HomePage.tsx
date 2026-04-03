import { useQuery } from "@tanstack/react-query";
import { Activity, Package, Users, Zap } from "lucide-react";
import api from "../utils/api";

const stats = [
  { label: "Total Items", icon: Package, color: "text-indigo-600 bg-indigo-50", key: "items" },
  { label: "Active Users", icon: Users, color: "text-emerald-600 bg-emerald-50", key: "users" },
  { label: "API Health", icon: Activity, color: "text-sky-600 bg-sky-50", key: "health" },
  { label: "Uptime", icon: Zap, color: "text-amber-600 bg-amber-50", key: "uptime" },
];

export default function HomePage() {
  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: () => api.get("/health").then((r) => r.data),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Demo application connected to mesr.ai for AI-powered PR reviews.
        </p>
      </div>

      {/* Status banner */}
      <div className={`rounded-lg px-4 py-3 flex items-center gap-3 text-sm font-medium ${
        health ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500"
      }`}>
        <span className={`w-2 h-2 rounded-full ${health ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
        {health ? `API is healthy — ${health.service}` : "Connecting to API..."}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">—</p>
            </div>
          </div>
        ))}
      </div>

      {/* mesr.ai callout */}
      <div className="bg-white rounded-xl border border-indigo-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center font-bold">M</span>
          mesr.ai Code Review Active
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          This repository is connected to <strong>mesr.ai</strong>. Every pull request will automatically
          receive an AI-powered code review covering code quality, security, performance, and best practices.
        </p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          {[
            "✅ Python / FastAPI backend review",
            "✅ React / TypeScript frontend review",
            "✅ Terraform infrastructure review",
            "✅ Security & secrets scanning",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
