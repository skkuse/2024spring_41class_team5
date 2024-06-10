import axios from 'axios'

const host = process.env.NEXT_PUBLIC_API_HOST

export const signup = async (username: string, studentId: number, password: string) => {
  const response = await axios.post(
    `${host}/auth/signup`,
    {
      username,
    },
    {
      headers: {
        Authorization: 'Basic ' + studentId + ':' + password,
        'Cache-Control': 'no-cache',
      },
    },
  )

  const message = response.data.message
  if (message) alert(message)
  const accessToken = response.data.access_token
  if (accessToken) sessionStorage.setItem('accessToken', accessToken)
  const refreshToken = response.data.refresh_token
  if (refreshToken) sessionStorage.setItem('refreshToken', refreshToken)
  window.location.href = '/login'
}
