import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '@/components/ui/toast/use-toast'

interface Credentials {
  accessToken: string
  uid: string
  client: string
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { data: credentials } = useQuery<Credentials | null>({
    queryKey: ['auth', 'credentials'],
    initialData: null,
    enabled: false,
  })
  const { toast } = useToast()

  /**
   * ログイン
   */
  const login = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      if (!(email === 'coji@techtalk.jp' && password === 'password')) {
        throw new Error('Email or password is invalid.')
      }
      queryClient.setQueryData(['auth', 'credentials'], {
        accessToken: 'accessToken',
        client: 'client',
        uid: 'uid',
      })
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      return true
    },
    onSuccess: () => {
      toast({
        title: 'Login Success',
        description: 'You are logged in.',
        variant: 'default',
      })
    },
    onError: (error) => {
      toast({
        title: 'Login Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  /**
   * ログアウト
   */
  const logout = () => {
    queryClient.setQueryData(['auth', 'credentials'], null)
  }

  /**
   * 自分の情報
   */
  const me = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => {
      // return fetch('/api/v1/auth/me', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }).then((res) => res.json())
      if (credentials.value) {
        return {
          id: 1,
          displayName: '溝口浩二',
          email: 'coji@techtalk.jp',
        }
      } else {
        return null
      }
    },
    initialData: null,
  })

  return {
    login,
    logout,
    me,
    credentials,
  }
}
