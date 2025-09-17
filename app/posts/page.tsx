'use client'
import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useFetch } from '../hooks/useFetch'
import { IPosts } from '../types/post.type'
import Card from '../components/Card'


const API = 'https://jsonplaceholder.typicode.com/posts' // jsonplaceholder docs: stable endpoint. :contentReference[oaicite:10]{index=10}

export default function PostsPage() {
  const [simulateError, setSimulateError] = useState(false)
  const url = simulateError ? `${API}/invalid-endpoint` : API
  const { data, loading, error, refetch } = useFetch<IPosts[]>(url)

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSimulateError((s) => !s)}
            className={`px-3 py-1 rounded ${simulateError ? 'bg-red-500 text-white' : 'bg-slate-200'}`}
          >
            {simulateError ? 'Simulating Error' : 'Simulate Error'}
          </button>
          <button onClick={() => refetch?.()} className="px-3 py-1 rounded bg-indigo-600 text-white">
            Refresh
          </button>
        </div>
      </div>

      {loading && <div className="py-10 text-center">Loading posts…</div>}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          Failed to load posts: {error}
        </div>
      )}

      {!loading && !error && data && (
        <motion.ul variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {data.map((p) => (
              <motion.li key={p.id} variants={item}>
                <Card title={p.title}>
                  <p className="text-sm text-slate-700 mb-3">{p.body.slice(0, 120)}...</p>
                  <Link href={`/posts/${p.id}`} className="text-indigo-600 text-sm font-medium">Read more →</Link>
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
