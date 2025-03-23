import axios from "axios"
import { useEffect, useState } from "react"

import { useApiCall } from "~utils/api"

import "./styles/globals.css"

import Accounts from "./components/Accounts"

interface AuthResponse {
  token: string
}

function IndexPopup() {
  const [data, setData] = useState("")
  const [login, setLogin] = useState(false)
  const [executeApiCall, apiState] = useApiCall<AuthResponse>()

  useEffect(() => {
    const checkAuth = async () => {
      const { token } = await chrome.storage.sync.get("authToken")
      if (!token) {
        setLogin(true)
      }

      const { data, error } = await executeApiCall({
        url: "http://localhost:3000/api/authenticate",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (error) {
        console.log(error)
      }

      console.log(data)

      if (data && data.token) {
        await chrome.storage.sync.set({ authToken: data.token })
      }
    }
    checkAuth()
  }, [])

  return (
    <div className="p-4 min-w-[400px]">
      <Accounts />
    </div>
  )
}

export default IndexPopup
