import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '@/components/ui/toast/use-toast'

interface User {
  id: number
  displayName: string
  photoUrl?: string
  email: string
}

interface Credentials {
  accessToken: string
  uid: string
  client: string
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const credentials = useQuery<Credentials | undefined>({
    queryKey: ['auth', 'credentials'],
    enabled: false,
  })
  const me = useQuery<User | undefined>({
    queryKey: ['auth', 'me'],
    enabled: false,
  })

  /**
   * 認証情報ステートの更新
   * @param credentials
   */
  const updateCredentials = (credentials?: Credentials) =>
    queryClient.setQueryData(['auth', 'credentials'], credentials)

  /**
   * ユーザー情報ステートの更新
   */
  const updateMe = (me?: User) => queryClient.setQueryData(['auth', 'me'], me)

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
      const response = await fetch(
        'http://localhost:3000/api/v1/auth/sign_in',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
      )
      if (!response.ok) throw new Error(await response.text())

      const credential = {
        accessToken: response.headers.get('access-token')!,
        uid: response.headers.get('uid')!,
        client: response.headers.get('client')!,
      }
      const { data: user } = (await response.json()) as {
        data: {
          allow_password_change: boolean
          email: string
          id: number
          image: string | null
          name: string
          nickname: string | null
          provider: string
          uid: string
        }
      }

      updateCredentials(credential)
      updateMe({
        id: user.id,
        photoUrl: user.image ?? undefined,
        displayName: user.name,
        email: user.email,
      })
      return true
    },
    onSuccess: () =>
      toast({
        title: 'Login Success',
        description: 'You are logged in.',
        variant: 'default',
      }),
    onError: (error) =>
      toast({
        title: 'Login Error',
        description: error.message,
        variant: 'destructive',
      }),
  })

  /**
   * ログアウト
   */
  const logout = () => {
    updateCredentials(undefined)
    updateMe(undefined)
  }

  return {
    login,
    logout,
    me,
    credentials,
  }
}
