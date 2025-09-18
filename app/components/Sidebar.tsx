'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiHome, HiClipboardList, HiUsers } from 'react-icons/hi'

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex">
      <motion.aside
        initial={{ width: 64 }}
        animate={{ width: open ? 250 : 64 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="bg-slate-800 text-white min-h-screen p-3"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold">{open ? 'Mini Dashboard' : 'MD'}</span>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle sidebar"
            className="p-2 rounded hover:bg-white/10"
          >
            {open ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <Link className="flex items-center gap-3 p-2 rounded hover:bg-white/5" href="/">
            <HiHome /> {open && <span>Home</span>}
          </Link>
          <Link className="flex items-center gap-3 p-2 rounded hover:bg-white/5" href="/posts">
            <HiClipboardList /> {open && <span>Posts</span>}
          </Link>
          <Link className="flex items-center gap-3 p-2 rounded hover:bg-white/5" href="/users">
            <HiUsers /> {open && <span>Users</span>}
          </Link>
        </nav>
      </motion.aside>
    </div>
  )
}
