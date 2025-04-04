import { FaGoogle } from 'react-icons/fa';
import { signIn } from "@/lib/auth"
 
export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit"  className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <FaGoogle className="w-5 h-5 mr-2 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">Sign in with Google</span></button>
    </form>
  )
} 