import { useQuery } from '@tanstack/vue-query'
import { useAuth } from '@/hooks/useAuth'

export const usePosts = () => {
  const { credentials, getAuthHeaders } = useAuth()

  return useQuery({
    queryKey: ['posts', 'index'],
    queryFn: async () => {
      if (credentials.data.value === null) return []

      const response = await fetch(
        `${import.meta.env.VITE_API_ROOT}/api/v1/posts`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        },
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      console.log(response)

      const posts = (await response.json()) as {
        id: string
        title: string
        body: string
        created_at: string
        updated_at: string
      }[]
      return posts
    },
  })
}
