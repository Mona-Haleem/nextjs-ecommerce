import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-5 border-blue-500"></div>
    </div>
  );
}