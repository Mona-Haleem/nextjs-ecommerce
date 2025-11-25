"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FloatingLabelInput from "./Input";
import Image from "next/image";

export default function ProfileEditor() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    username: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        phoneNumber: session.user.phoneNumber || "",
        username: session.user.username || "",
      });
      setImagePreview(session.user.image || null);
    }
  }, [session]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!session) return <div>Loading session...</div>;

  return (
    <>
      <div className="flex justify-center p-4">
        <Image
          className="w-36 h-36 mb-4 rounded-full object-cover"
          src={imagePreview || "/default-avatar.png"}
          alt="Profile Preview"
          width={144}
          height={144}
        />
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <FloatingLabelInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <FloatingLabelInput
          label="Name"
          name="name"
          value={formData.username}
          onChange={handleChange}
        />
        <FloatingLabelInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FloatingLabelInput
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <div className="mb-4 flex justify-center gap-5 items-center">
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Upload Profile Picture
            <input type="file" className="hidden" />
          </label>

          <button
            type="submit"
            className=" bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}
