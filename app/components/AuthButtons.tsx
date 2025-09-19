"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

interface IProps {
  open: boolean;
}

export default function AuthButtons({ open }: IProps) {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Image
          src={session.user?.image || "/default-avatar.png"}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
          priority
        />
        <span>{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return open ? (
    <button
      onClick={() => signIn("google")}
      className="px-3 py-1 bg-indigo-600 text-white rounded"
    >
      Sign In with Google
    </button>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="bg-gray-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      <FcGoogle size={20} />
    </button>
  );
}
