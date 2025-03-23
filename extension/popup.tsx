import { useState } from "react"
import "./styles/globals.css"
import Accounts from "./components/Accounts"
function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="p-4 min-w-[400px]">
      <Accounts />
    </div>
  )
}

export default IndexPopup
