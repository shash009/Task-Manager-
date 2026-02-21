"use client";

import React from "react";

interface Props {
  total: number;
  completed: number;
  pending: number;
}

export const DashboardStats: React.FC<Props> = ({ total, completed, pending }) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
        <p className="text-sm text-gray-300">Total</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
        <p className="text-sm text-gray-300">Completed</p>
        <p className="text-2xl font-bold text-green-400">{completed}</p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
        <p className="text-sm text-gray-300">Pending</p>
        <p className="text-2xl font-bold text-yellow-300">{pending}</p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
        <p className="text-sm text-gray-300">Completion</p>
        <p className="text-2xl font-bold">{percent}%</p>
      </div>
    </div>
  );
};

export default DashboardStats;
