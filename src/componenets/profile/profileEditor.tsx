'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; 
import FloatingLabelInput from './Input';

// async function updateUser(userId: string, data: { name: string; email: string,phoneNumber: string,username: string }) {
//   const res = await fetch(`${SERVER_URL}/users/${userId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) {
//     throw new Error('Failed to update user data');
//   }
//   return res.json();
// }

export default function ProfileEditor() {
  const {data:session}  = useSession(); 
 

  const [formData, setFormData] = useState({ name: '', email: '' ,phoneNumber: '', username: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phoneNumber: session.user.phoneNumber || '',
        username: session.user.username || '',
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

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);  
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  if (!session) return <div>Loading session...</div>;

  return (
    <>
    
      <div className="flex justify-center p-4">
           <img
              className="w-36 h-36 mb-4  rounded-full object-cover"
              src={imagePreview || "/default-avatar.png"} // Fallback image if no preview is selected
              alt="Profile Preview"
            />
        
      </div>

    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      
      <FloatingLabelInput label="Username" name="username" value={formData.username} onChange={handleChange} />
      <FloatingLabelInput label="Name" name="name" value={formData.name} onChange={handleChange} />
      <FloatingLabelInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
      <FloatingLabelInput label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />

     
  
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
