import { createSignal } from "solid-js"
import axios from "axios"

interface ApiCallOptions<T> {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  status: number
  data: T | null
  error: Error | null
}

export function useApiCall<T>(): [
  (options: ApiCallOptions<T>) => Promise<ApiResponse<T>>,
  ApiResponse<T>
] {
  const [state, setState] = createSignal<ApiResponse<T>>({
    status: 0,
    data: null,
    error: null
  })

  const execute = async (options: ApiCallOptions<T>): Promise<ApiResponse<T>> => {
    const { url, method = "GET", body, headers = {} } = options

    try {
      const response = await axios({
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        data: body
      })

      const result: ApiResponse<T> = {
        status: response.status,
        data: response.data,
        error: null
      }

      setState(result)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error("An unknown error occurred")
      const result: ApiResponse<T> = {
        status: axios.isAxiosError(error) ? error.response?.status || 0 : 0,
        data: null,
        error: err
      }
      setState(result)
      return result
    }
  }

  return [execute, state()]
}

// Example usage:
/*
const [executeApiCall, apiState] = useApiCall<YourDataType>();

// In your component:
const handleSubmit = async () => {
  const { status, data, error } = await executeApiCall({
    url: 'https://api.example.com/data',
    method: 'POST',
    body: { key: 'value' }
  });

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
};
*/
