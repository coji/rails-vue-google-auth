import { useQuery } from '@tanstack/vue-query'
import { useAuth } from '@/hooks/useAuth'

export const useUsers = () => {
  const { credentials, getAuthHeaders } = useAuth()

  return useQuery({
    queryKey: ['users', 'index'],
    queryFn: async () => {
      if (credentials.data.value === null) return []

      const response = await fetch(
        `${import.meta.env.VITE_API_ROOT}/api/v1/users`,
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

      const users = (await response.json()) as {
        id: number
        provider: string
        uid: string
        name?: string
        image?: string
        email?: string
        updated_at: string
        created_at: string
      }[]
      return users
    },
  })
}
