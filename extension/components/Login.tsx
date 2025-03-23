import React from "react"
import { useApiCall } from "~utils/api"
import { Storage } from "@plasmohq/storage"

interface LoginResponse {
  token: string
}

interface LoginProps {
  onSignup: () => void
}

const Login = ({ onSignup }: LoginProps) => {
  const [executeApiCall, apiState] = useApiCall<LoginResponse>()
  const storage = new Storage()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email")
    const password = formData.get("password")

    const { data, error } = await executeApiCall({
      url: "http://localhost:3000/api/login", 
      method: "POST",
      body: { email, password }
    })

    if (error) {
      console.log(error)
      return
    }

    if (data?.token) {
      try {
        await storage.set("authToken", data.token)
        await chrome.storage.sync.set({ authToken: data.token })
        console.log("Auth token stored successfully")
      } catch (err) {
        console.error('Failed to save auth token:', err)
      }
    }

    console.log(data)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-violet-800">
          Coverly Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-violet-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-violet-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors">
            Sign In
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={onSignup}
            className="text-sm text-violet-500 hover:text-violet-800">
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
