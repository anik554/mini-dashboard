"use client";
import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { IUsers } from "../types";
import Modal from "../components/Modal";
import { apiUsers } from "../constants/api.urls";
import Loader from "../components/Loader";

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<IUsers[]>(apiUsers);
  const [selected, setSelected] = useState<IUsers | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Users</h2>
          <h2 className="text-sm text-gray-500">
            A list of all the users in your account including their name, email
            and company.
          </h2>
        </div>

        <button
          onClick={() => refetch?.()}
          className="px-3 py-1 rounded bg-indigo-600 text-white"
        >
          Refresh
        </button>
      </div>

      {loading && <Loader />}
      {error && (
        <div className="text-red-600">Failed to load users: {error}</div>
      )}

      {data && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-500 border-b">
                <th className="px-6 py-3 text-left text-md font-bold text-white">
                  S/N
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-white">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-white">
                  Company
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((u, idx) => (
                <tr
                  key={u.id}
                  onClick={() => setSelected(u)}
                  className={`cursor-pointer transition-colors duration-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-100"
                  } hover:bg-indigo-50`}
                >
                  <td className="px-6 py-3 w-3 text-slate-800 font-sm">
                    {Number(idx) + 1 +"."}
                  </td>
                  <td className="px-6 py-3 text-slate-800 font-sm">
                    {u.name}
                  </td>
                  <td className="px-6 py-3 text-slate-600 font-sm">{u.email}</td>
                  <td className="px-6 py-3 text-slate-600 font-sm">
                    {u.company?.name}
                  </td>
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
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Phone:</strong> {selected.phone}
              </p>
              <p>
                <strong>Company:</strong> {selected.company?.name}
              </p>
              <p className="mt-2">
                <strong>Address:</strong> {selected.address?.street},{" "}
                {selected.address?.city}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                ID: {selected.id} • Username: {selected.username}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}