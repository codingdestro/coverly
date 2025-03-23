import React, { useState } from "react"

import Login from "./Login"
import SignUp from "./SignUp"

const Accounts = () => {
  const [login, setLogin] = useState(false)
  return (
    <div>
      {login ? (
        <Login onSignup={() => setLogin(false)} />
      ) : (
        <SignUp onSignin={() => setLogin(true)} />
      )}
    </div>
  )
}

export default Accounts
