"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { UserStats } from "../types";
import { IoStatsChart } from "react-icons/io5";

type Props = {
  data: UserStats[];
};

export default function UsersBarChart({ data }: Props) {
  return (
    <div className="w-full h-96 bg-white rounded shadow p-4">
      <div className="flex item-center gap-2">
        <IoStatsChart size={25} color="oklch(79.5% 0.184 86.047)" />
        <h3 className="text-lg font-semibold mb-4">Users Stats by Company</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#0088FE" />
          <Bar dataKey="active" fill="#00C49F" />
          <Bar dataKey="inactive" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
