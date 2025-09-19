"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getCompanyName } from "../utils/getCompanyName";
import { IUsers } from "../types";
import { BsBuildings } from "react-icons/bs";
import { COLORS } from "../constants/pieChartColor";

type Props = {
  users: IUsers[];
};

export default function UserPieChart({ users }: Props) {
  const companyCounts = getCompanyName(users);

  const data = Object.entries(companyCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-full h-96 bg-white rounded shadow p-4">
      <div className="flex item-center gap-2">
        <BsBuildings size={25} color="oklch(45.5% 0.188 13.697)" />
        <h3 className="text-lg font-semibold mb-4">Users by Company</h3>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
