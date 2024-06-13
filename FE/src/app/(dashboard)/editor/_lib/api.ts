import instance from '../../../_lib/axios'

/**
 *
 * @param code user typed code
 * @return suggested code by LLM
 */
export const getCode = async (code: string) => {
  const response = await instance.post(
    '/green',
    {
      code,
    },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
        'Cache-Control': 'no-cache',
      },
    },
  )

  return response.data.code
}

/**
 *
 * @param code user submitted code
 * @returns code excution runtime or null if error
 */
export const submitCode = async (originalCode: string, mergedCode: string) => {
  const response = await instance.post(
    '/green/codes',
    {
      original_code: originalCode,
      merged_code: mergedCode,
    },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
        'Cache-Control': 'no-cache',
      },
    },
  )

  const message = response.data.message
  const detail = response.data.detail
  if (message) {
    alert('Error: \n' + message + '\n\nDetail: ' + detail)
    return
  }
  return response.data
}
