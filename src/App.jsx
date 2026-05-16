import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactForm from './ContactForm'
import SuccessPage from './SuccessPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContactForm />} />
      <Route path="/successful" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
