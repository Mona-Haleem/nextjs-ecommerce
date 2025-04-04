import { signIn } from "@/lib/auth";
import { FaFacebookF } from 'react-icons/fa';
export default function FacebookSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("facebook");
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white border border-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
       <FaFacebookF className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Sign in with Facebook</span>
      </button>
    </form>
  );
}
