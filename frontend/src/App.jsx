import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Connection error'))
  }, [])

  return (
    <div className="p-10 text-center text-lg">
      <h1 className="text-2xl font-bold mb-4">Integracja Flask + React</h1>
      <p>{message}</p>
    </div>
  )
}

export default App
