import { useState } from "react"
import "./styles/globals.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="p-4 min-w-[400px]">
      <h1 className="text-2xl font-bold text-gray-800">Hello World</h1>
    </div>
  )
}

export default IndexPopup
