import { useState } from 'react'
import JobPostPage from './comonents/JobPostPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <JobPostPage/>
  )
}

export default App
