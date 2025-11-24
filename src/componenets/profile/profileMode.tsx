'use client';

import { useState } from 'react';
import ProfileEditor from './profileEditor';


export default function ProfileMode({children}: {children: React.ReactNode}) {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] mx-auto p-4">
      <div className="w-full lg:w-1/2 shadow-lg text-center p-5 bg-white rounded-lg ">

        {editMode ? (
          <ProfileEditor />
        ) : (
            children
        )}

        <button
          onClick={handleEditClick}
          className={`${editMode ?'bg-orange-600':'bg-blue-500'} text-white px-4 py-2 w-50 rounded`}
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>

      </div>
    </div>
  );
}
