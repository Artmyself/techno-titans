import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function validateContactEmail(email) {
  const { data } = await client.post('/api/contact', { email })
  return data
}