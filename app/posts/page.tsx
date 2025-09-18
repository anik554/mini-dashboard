"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useFetch } from "../hooks/useFetch";
import { IPosts } from "../types/post.type";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { apiPosts } from "../constants/api.urls";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function PostsPage() {
  const [simulateError, setSimulateError] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const url = simulateError ? `${apiPosts}/invalid-endpoint` : apiPosts;
  const { data, loading, error, refetch } = useFetch<IPosts[]>(url);

  const paginatedData = data
    ? data.slice((page - 1) * perPage, page * perPage)
    : [];

  const totalPages = data ? Math.ceil(data.length / perPage) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSimulateError((s) => !s)}
            className={`px-3 py-1 rounded ${
              simulateError ? "bg-red-500 text-white" : "bg-slate-200"
            }`}
          >
            {simulateError ? "Simulating Error" : "Simulate Error"}
          </button>
          <button
            onClick={() => refetch?.()}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && <Loader />}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          Failed to load posts: {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {paginatedData.map((p) => (
                <motion.li key={p.id} variants={item}>
                  <Card title={p.title}>
                    <p className="text-sm text-slate-700 mb-3">{p.body}</p>
                    <Link
                      href={`/posts/${p.id}`}
                      className="text-indigo-600 text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </Card>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <div className="flex items-center justify-end mt-6 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-slate-200 disabled:opacity-50"
            >
              <GrFormPrevious />
            </button>

            <span className="px-3 py-1 text-center text-slate-600">
              Showing {(page - 1) * perPage + 1} to{" "}
              {Math.min(page * perPage, data.length)} of {data.length} results
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-slate-200 disabled:opacity-50"
            >
              <GrFormNext />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
