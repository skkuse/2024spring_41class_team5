import instance from "../../_lib/axios"

/**
 * @param studentId
 * @param password
 * @return
 */
export const login = async (studentId: number, password: string) => {
  const response = await instance.post(
    '/auth/login',
    {
      studentId,
    },
    {
      headers: {
        Authorization: 'Basic ' + window.btoa(studentId + ':' + password),
      },
    },
  )

  const accessToken = response.data.access_token
  if (accessToken) sessionStorage.setItem('accessToken', accessToken)
  const refreshToken = response.data.refresh_token
  if (refreshToken) sessionStorage.setItem('refreshToken', refreshToken)
  window.location.href = '/dashboard'
}
