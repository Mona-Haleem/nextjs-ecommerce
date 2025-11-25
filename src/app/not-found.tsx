import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      <h1 className="text-8xl font-bold">404</h1>
      
      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 text-center max-w-md">
        Sorry, we could not find the page you are looking for.  
        It might have been moved, deleted, or never existed.
      </p>

      <Link href="/" className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition" >
        Go Home
      </Link>
    </div>
  );
}
