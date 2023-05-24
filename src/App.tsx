import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ParameterInput from './components/ParameterInput.component'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ParameterInput />
    </>
  )
}

export default App
