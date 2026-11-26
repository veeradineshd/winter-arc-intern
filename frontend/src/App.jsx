import React from 'react'
import Student from './assets/components/Student'
const App = () => {
  let name="Sheru Bhai"
  let net=345672890934526378123456789.1456789123456789
  return (
    <>
      <div>App</div>
      <h1>This is {name}</h1>
      <h1>His NetWorth is {net}</h1>
      <Student name="Sheru Bhai"/>
    </>
  )
}

export default App
