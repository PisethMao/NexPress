'use client';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div>
      <section className="min-h-screen flex flex-col">
        <div className="flex justify-center items-center grow py-12">
          <div className="border border-gray-300 rounded-3xl p-8 w-full max-w-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Login</h2>
            <form action="#">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username or Email</label>
                <input type="text" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter your email" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" className="w-full border-b border-gray-300 outline-none py-2" placeholder="••••••••" />
              </div>
              <div className="flex justify-between items-center text-sm mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="dark:text-gray-300 mr-2" />
                  Remember Me
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot Password</a>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white  py-2 rounded-full cursor-pointer">Login</button>
              <p className="text-sm text-center mt-4">
                Don't have an account?
                <a href="/signup" className="text-blue-600 hover:underline"> Create an account</a>
              </p>
            </form>

            <div className="flex items-center my-6">
              <div className="grow h-px bg-gray-300" />
              <span className="px-4 text-sm text-gray-500">Or</span>
              <div className="grow h-px bg-gray-300" />
            </div>

            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full mb-3 cursor-pointer">
              <FaFacebook size={18} className="text-blue-600" />
              Continue with Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full cursor-pointer">
              <FcGoogle size={18} />
              Continue with Google
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
