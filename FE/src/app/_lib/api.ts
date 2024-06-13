import instance from './axios'

/**
 * Refreshes the access token.
 * and stores the new access token and refresh token in the session storage.
 * If the refresh token is invalid, the user is redirected to the login page.
 */
export const refresh = async () => {
  const response = await instance
    .post(
      '/auth/refresh',
      {
        refresh_token: sessionStorage.getItem('refreshToken'),
      },
      {
        headers: {
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CLIENT_SECRET,
        },
      },
    )
    .catch((error) => {
      window.location.href = '/login'
      return error.response
    })

  const message = response.data.message
  if (message) alert(message)
  const accessToken = response.data.access_token
  if (accessToken) sessionStorage.setItem('accessToken', accessToken)
  const refreshToken = response.data.refresh_token
  if (refreshToken) sessionStorage.setItem('refreshToken', refreshToken)
}
