"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Loader from "../components/Loader";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") redirect("/");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hi, {session?.user?.name}</h2>
      <div className="bg-white p-4 rounded shadow w-4/12">
        <p>
          <strong>Name:</strong> {session?.user?.name}
        </p>
        <p>
          <strong>Email:</strong> {session?.user?.email}
        </p>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="profile"
            width={96}
            height={96}
            className="mt-4 rounded-full"
            priority
          />
        )}
      </div>
    </div>
  );
}
