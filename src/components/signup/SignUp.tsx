'use client';

export default function SignUp() {
  return (
    <div>
      <section className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="max-w-md w-full mt-40 mx-auto p-8 border border-gray-300 rounded-3xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Create Your Account</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter your first name" />
              <div className="mt-1 text-sm text-red-600 dark:text-red-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input type="text" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter your last name" />
              <div className="mt-1 text-sm text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="text" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter your email" />
            <div className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
                <input type="password" className="w-full border-b border-gray-300 outline-none py-2" placeholder="••••••••" />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              </button>
            </div>
            <div x-show="errors.password" x-text="errors.password" className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
                <input type="password" className="w-full border-b border-gray-300 outline-none py-2" placeholder="••••••••" />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              </button>
            </div>
            <div className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                  <input type="checkbox" className="dark:text-gray-300 mr-2" />
              </div>
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</a>
              </label>
            </div>
            <div className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>
          <div className="flex justify-center">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center cursor-pointer">
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
