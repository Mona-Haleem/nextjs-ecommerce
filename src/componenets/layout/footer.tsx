import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-gray-900 mt-auto p-3 text-white'>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {["Privacy Policy","Terms of Service","Contact"].map(item =>
            <p key={item} className="hover:text-white transition cursor-pointer">{item}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
