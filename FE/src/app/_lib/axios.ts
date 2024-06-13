import axios from 'axios'
import { refresh } from './api'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
})

instance.interceptors.request.use(undefined, async (error) => {
  return await refresh()
    .then(() => Promise.resolve())
    .catch(() => Promise.reject(error))
})

export default instance
