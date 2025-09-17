'use client'
import { motion } from 'framer-motion'
import Card from './components/Card'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-3xl font-bold">
        Welcome back 👋
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Users">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <div className="text-3xl font-semibold">120</div>
            <div className="text-xs text-slate-500">Active in last 30 days</div>
          </motion.div>
        </Card>

        <Card title="Posts">
          <div className="text-3xl font-semibold">—</div>
          <div className="text-xs text-slate-500">Fetched on demand</div>
        </Card>

        <Card title="Animated">
          {/* tiny animated bar chart (pure CSS + motion to satisfy 'small animated element') */}
          <div className="flex items-end gap-2 h-20">
            {[4, 8, 12, 6, 10].map((h, i) => (
              <motion.div key={i} animate={{ height: `${h * 6}px` }} transition={{ delay: i * 0.08 }} className="w-3 bg-indigo-500 rounded" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
