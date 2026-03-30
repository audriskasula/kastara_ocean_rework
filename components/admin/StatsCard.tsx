"use client";

import React from "react";
import Skeleton from "@/components/Skeleton";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: string; direction: "up" | "down" };
  color: "rose" | "blue" | "emerald" | "amber" | "violet" | "cyan";
  loading?: boolean;
}

export default function StatsCard({ icon, label, value, trend, color, loading = false }: StatsCardProps) {
  if (loading) {
    return (
      <div className="admin-stat-card">
        <Skeleton width="48px" height="48px" borderRadius="12px" />
        <div className="admin-stat-content" style={{ flex: 1 }}>
          <Skeleton width="100px" height="14px" className="mb-2" />
          <div className="flex gap-3 items-center">
            <Skeleton width="60px" height="32px" />
            <Skeleton width="80px" height="20px" borderRadius="6px" />
          </div>
        </div>
      </div>
    );
  }

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
