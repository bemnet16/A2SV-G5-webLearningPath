import { AlertCircle, LogIn, User, X } from "lucide-react";
import Link from "next/link";

const PopUp = ({ setIsPopUp }: { setIsPopUp: (value: boolean) => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm relative">
        <button
          className="text-gray-400 hover:text-gray-600 cursor-pointer rounded-full border p-1 border-gray-400 absolute top-2 right-2"
          onClick={() => setIsPopUp(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-between mb-4 relative">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Authentication Required
          </h2>
        </div>
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="text-yellow-500 w-12 h-12 mr-4" />
          <p className="text-gray-600 text-base">
            You need to be authenticated to bookmark this opportunity. Please
            sign up or log in to continue.
          </p>
        </div>
        <div className="flex justify-center gap-4 m-3 mt-14">
          <Link
            href="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            <span>Sign Up</span>
          </Link>
          <Link
            href="/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
