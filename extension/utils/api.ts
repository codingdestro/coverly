import { createSignal } from "solid-js"

interface ApiCallOptions<T> {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  headers?: Record<string, string>
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  onLoading?: (isLoading: boolean) => void
}

interface ApiState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export function useApiCall<T>(): [
  (options: ApiCallOptions<T>) => Promise<void>,
  ApiState<T>
] {
  const [state, setState] = createSignal<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false
  })

  const execute = async (options: ApiCallOptions<T>): Promise<void> => {
    const {
      url,
      method = "GET",
      body,
      headers = {},
      onSuccess,
      onError,
      onLoading
    } = options

    try {
      setState((prev) => ({ ...prev, isLoading: true }))
      onLoading?.(true)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setState((prev) => ({
        ...prev,
        data,
        error: null,
        isLoading: false
      }))

      onSuccess?.(data)
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error("An unknown error occurred")

      setState((prev) => ({
        ...prev,
        error: err,
        isLoading: false
      }))

      onError?.(err)
    } finally {
      onLoading?.(false)
    }
  }

  return [execute, state()]
}

// Example usage:
/*
const [executeApiCall, apiState] = useApiCall<YourDataType>();

// In your component:
const handleSubmit = async () => {
  await executeApiCall({
    url: 'https://api.example.com/data',
    method: 'POST',
    body: { key: 'value' },
    onSuccess: (data) => {
      console.log('Success:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
    onLoading: (isLoading) => {
      console.log('Loading:', isLoading);
    },
  });
};
*/
