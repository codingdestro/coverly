import { useState } from "react"
import "./styles/globals.css"
import Login from "./components/Login"
function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="p-4 min-w-[400px]">
      <Login />
    </div>
  )
}

export default IndexPopup
