import type { UnwrapRef } from 'vue'

export function useRequest<U>(fetcher: () => Promise<U>): {
  request: () => Promise<U>
  loading: Ref<boolean>
  error: Ref<any | null>
  data: Ref<U | null>
}

export function useRequest<T, U>(fetcher: (payload: T) => Promise<U>): {
  request: (payload: T) => Promise<U>
  loading: Ref<boolean>
  error: Ref<any | null>
  data: Ref<U | null>
}

export function useRequest<T, U>(fetcher: (payload?: T) => Promise<U>) {
  const loading = ref(false)
  const error = ref<any | null>(null)
  const data = ref<U | null>(null)

  const request = async (payload?: T) => {
    try {
      loading.value = true
      const response = await fetcher(payload)
      data.value = response as UnwrapRef<U>
      return response
    }
    catch (err) {
      error.value = err
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    request,
    loading,
    error,
    data,
  }
}
