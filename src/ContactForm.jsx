import { useState } from 'react'

export default function ContactForm() {
  const [email, setEmail] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    alert(`Email submitted: ${email}`)
  }

  return (
    <>
      <div class="container">
        <div class="form-wrapper">
          <div class="form-header">
            <h1>Get in Touch</h1>
            <p>Welcome to CAN InfoTech. Connect with us to explore the future of technology.</p>
          </div>

          <form onSubmit={handleSubmit} id="contact-form">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>


            <input
              type="submit"
              value="Submit"
              id="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  )
}
