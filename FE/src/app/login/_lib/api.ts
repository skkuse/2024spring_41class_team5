import axios from 'axios'

const host = process.env.NEXT_PUBLIC_API_HOST

/**
 * @param studentId
 * @param password
 * @return
 */
export const login = async (studentId: number, password: string) => {
  const response = await axios.post(
    `${host}/auth/login`,
    {
      studentId,
    },
    {
      headers: {
        Authorization: 'Basic ' + window.btoa(studentId + ':' + password),
        'Cache-Control': 'no-cache',
      },
    },
  )

  const accessToken = response.data.access_token
  if (accessToken) sessionStorage.setItem('accessToken', accessToken)
  const refreshToken = response.data.refresh_token
  if (refreshToken) sessionStorage.setItem('refreshToken', refreshToken)
  window.location.href = '/dashboard'
}
