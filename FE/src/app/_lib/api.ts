import axios from 'axios'

const host = process.env.NEXT_PUBLIC_API_HOST

export const refresh = async () => {
  const response = await axios.post(
    `${host}/auth/refresh`,
    {
      refresh_token: sessionStorage.getItem('refreshToken'),
    },
    {
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
    },
  )

  const message = response.data.message
  if (message) alert(message)
  const accessToken = response.data.access_token
  if (accessToken) sessionStorage.setItem('accessToken', accessToken)
  const refreshToken = response.data.refresh_token
  if (refreshToken) sessionStorage.setItem('refreshToken', refreshToken)
}
