import { createSignal } from "solid-js"

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
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      })

      const data = await response.json()

      const result: ApiResponse<T> = {
        status: response.status,
        data: response.ok ? data : null,
        error: response.ok ? null : new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      setState(result)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error("An unknown error occurred")
      const result: ApiResponse<T> = {
        status: 0,
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
