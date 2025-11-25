"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const Avatar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const navToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="relative">
      <button
        onClick={navToProfile}
        className="text-gray-600 w-8 h-8 overflow-hidden dark:text-white hover:text-gray-900 focus:outline-none"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image || "/avatar.png"}
            alt={session.user.username || "user"}
            width={32}
            height={32}
            className="object-contain rounded-full"
          />
        ) : (
          <FaUserCircle size={24} />
        )}
      </button>
    </div>
  );
};

export default Avatar;
