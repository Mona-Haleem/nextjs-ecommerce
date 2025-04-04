"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Avatar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut(); 
  };

  const navToProfile = () => {
    setMenuOpen(false);
    router.push("/profile");
  };

  return (
    <div className="relative">
      <button
        onClick={() => (session ? setMenuOpen(!menuOpen) : router.push("/login"))}
        className="text-gray-600 dark:text-white hover:text-gray-900 focus:outline-none"
      >
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="User"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        ) : (
          <FaUserCircle size={24} />
        )}
      </button>

      {session && menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20">
          <button
            onClick={navToProfile}
            className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
