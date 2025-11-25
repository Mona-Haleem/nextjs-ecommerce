import React from 'react'

export default function Footer() {
  return (
        <footer className="bg-gray-900 mt-auto p-6 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Copyright */}
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex space-x-6">
          {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
            <p
              key={item}
              className="cursor-pointer text-gray-300 hover:text-white transition"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </footer>

  )
}
