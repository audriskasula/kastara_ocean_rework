"use client";

import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: string; direction: "up" | "down" };
  color: "rose" | "blue" | "emerald" | "amber" | "violet" | "cyan";
}

export default function StatsCard({ icon, label, value, trend, color }: StatsCardProps) {
  return (
    <div className="admin-stat-card">
      <div className={`admin-stat-icon ${color}`}>{icon}</div>
      <div className="admin-stat-content">
        <h3>{label}</h3>
        <div className="flex gap-3 items-center">
          <div className="admin-stat-value">{value}</div>
          {trend && (
            <div className={`admin-stat-trend ${trend.direction}`}>
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
