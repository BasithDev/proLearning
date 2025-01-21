import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Admin = () => {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const passkey = 'admin'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passkey) {
      toast.success('Login successful!')
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 1000)
    } else {
      toast.error('Invalid passkey! Please try again.')
      setPassword('')
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-[calc(100vh-8rem)]">
      <Toaster position="top-center" />
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 transform -translate-y-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
            ProLearning Admin
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Enter your Passkey to access admin dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="Enter admin/moderator passkey"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admin