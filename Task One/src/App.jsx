import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Class from './Class/Class'
import Trial from './Function/Trial'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='Container'>
    {/* using class component */}
    <Class />

    {/* using functional component and hooks useState*/}
    <Trial />
    </div>
  )
}

export default App
