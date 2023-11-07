import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '@/components/ui/toast/use-toast'

interface Credentials {
  accessToken: string
  uid: string
  client: string
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  /**
   * 認証情報ステートの取得
   */
  const getCredentials = () =>
    queryClient.getQueryData<Credentials | undefined>(['auth', 'credentials'])
  /**
   * 認証情報ステートの更新
   * @param credentials
   */
  const updateCredentials = (credentials?: Credentials) => {
    queryClient.setQueryData(['auth', 'credentials'], credentials)
    queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    return credentials
  }

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
      updateCredentials({
        accessToken: 'accessToken',
        client: 'client',
        uid: 'uid',
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
      const credentials = getCredentials()
      if (!credentials) {
        return null
      }
      return {
        id: 1,
        displayName: '溝口浩二',
        email: 'coji@techtalk.jp',
      }
    },
    initialData: null,
  })

  return {
    login,
    logout,
    me,
  }
}
