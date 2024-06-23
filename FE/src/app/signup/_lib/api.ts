import instance from '../../_lib/axios'

export const signup = async (username: string, studentId: number, password: string) => {
  const response = await instance.post(
    '/auth/signup',
    {
      username,
    },
    {
      headers: {
        Authorization: 'Basic ' + window.btoa(studentId + ':' + password),
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
