"use client";
import Card from "@/app/components/Card";
import Loader from "@/app/components/Loader";
import { apiPosts } from "@/app/constants/api.urls";
import { useFetch } from "@/app/hooks/useFetch";
import { IPosts } from "@/app/types";
import { useParams } from "next/navigation";

export default function PostDetail() {
  const params = useParams();
  const id = params?.id;
  const { data, loading, error } = useFetch<IPosts>(
    id ? `${apiPosts}/${id}` : null
  );

  return (
    <div>
      <button
        onClick={() => history.back()}
        className="mb-4 text-sm text-indigo-600"
      >
        ← Back
      </button>

      {loading && <Loader />}
      {error && (
        <div className="text-red-600">Failed to load post: {error}</div>
      )}

      {data && (
        <Card title={data.title}>
          <p className="text-slate-800">{data.body}</p>
          <div className="mt-4 text-sm text-slate-500">
            Post ID: {data.id} • User: {data.userId}
          </div>
        </Card>
      )}
    </div>
  );
}