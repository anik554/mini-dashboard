"use client";
import { motion } from "framer-motion";
import Card from "./components/Card";
import { useFetch } from "./hooks/useFetch";
import { IPosts, IUsers } from "./types";
import { apiPosts, apiUsers } from "./constants/api.urls";
import AnimatedCounter from "./components/AnimatedCounter";
import UserPieChart from "./components/UserPieChart";
import { mockUserStats } from "./data/mockUserStats";
import UsersBarChart from "./components/UsersBarChart";

export default function HomePage() {
  const { data } = useFetch<IUsers[]>(apiUsers);
  const { data: postsData } = useFetch<IPosts[]>(apiPosts);
  console.log(data);
  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-3xl font-bold"
      >
        Welcome back to mini dashboard 👋
      </motion.h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <Card title="Total Users">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <AnimatedCounter
                value={data ? data.length : 0}
                duration={3}
                className="font-bold"
              />
              <div className="text-xs text-slate-500">
                Users data from user api
              </div>
            </motion.div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Card title="Total Posts">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <AnimatedCounter
                value={postsData ? postsData.length : 0}
                duration={1}
                className="font-bold"
              />
              <div className="text-xs text-slate-500">
                Posts data from post api
              </div>
            </motion.div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4">
          <UsersBarChart data={mockUserStats} />
        </div>
        <div className="col-span-12 md:col-span-8">
          {data && data.length > 0 && <UserPieChart users={data} />}
        </div>
      </div>
    </div>
  );
}
