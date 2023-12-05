"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface OverviewProps {
  data: any[];
}

export const Overview = ({ data }: OverviewProps) => {
  return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart width={150} height={40} data={data} className="dark:text-white">
           <XAxis 
            dataKey="name"
            stroke="#87534"
            className="dark:text-white"
            fontSize={18}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#87534"
            fontSize={18}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar 
            dataKey="total"
            fill="#2858ff"
            radius={[4,4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
  );
};