'use client'
import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { IUsers } from '../types'
import Modal from '../components/Modal'

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<IUsers[]>('https://jsonplaceholder.typicode.com/users')
  const [selected, setSelected] = useState<IUsers | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button onClick={() => refetch?.()} className="px-3 py-1 rounded bg-indigo-600 text-white">Refresh</button>
      </div>

      {loading && <div>Loading users…</div>}
      {error && <div className="text-red-600">Failed to load users: {error}</div>}

      {data && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Company</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u) => (
                <tr key={u.id} onClick={() => setSelected(u)} className="cursor-pointer hover:bg-slate-100">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.company?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h3 className="text-lg font-semibold mb-2">{selected.name}</h3>
            <div className="text-sm text-slate-700">
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Company:</strong> {selected.company?.name}</p>
              <p className="mt-2"><strong>Address:</strong> {selected.address?.street}, {selected.address?.city}</p>
              <p className="mt-2 text-xs text-slate-400">ID: {selected.id} • Username: {selected.username}</p>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
