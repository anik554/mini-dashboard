"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch<T>(url: string | null, opts?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetcher = useCallback(
    async (finalUrl = url) => {
      if (!finalUrl) return;
      controllerRef.current?.abort();
      const ctrl = new AbortController();
      controllerRef.current = ctrl;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(finalUrl, { signal: ctrl.signal, ...opts });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [url, opts]
  );

  useEffect(() => {
    fetcher();
    return () => controllerRef.current?.abort();
  }, [fetcher]);

  return {
    data,
    loading,
    error,
    refetch: () => fetcher(),
  };
}
