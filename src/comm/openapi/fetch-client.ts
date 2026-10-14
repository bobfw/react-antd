import { flow } from 'es-toolkit'
import createFetchClient from 'openapi-fetch'

import type { paths } from './schema'

interface PayError {
  error: string
  message: string
  statusCode: number
}

export class ResponseError extends Error {
  override cause: PayError | undefined
  httpStatus: number
  override name = 'ResponseError'
  constructor(
    message: string,
    options: {
      cause?: PayError
      httpStatus: number
    },
  ) {
    super(message)
    this.cause = options.cause
    this.httpStatus = options.httpStatus
  }
}

export const fetchClientRwa = createFetchClient<paths>({
  baseUrl: 'https://jsonplaceholder.typicode.com',
})

export const fetchClient = flow(fetchClientRwa.request, async (res) => {
  const { data, error, response } = await res
  if (error != undefined) {
    throw new ResponseError(`Request failed with status ${String(response.status)}`, {
      cause: error as unknown as PayError,
      httpStatus: response.status,
    })
  }
  if (data == undefined) {
    throw new Error('Request failed with data is empty')
  }
  return data
})
