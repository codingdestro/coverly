import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="bg-blue-500 text-white p-2 rounded-md">Login</button>
    </div>
  )
}

export default Login