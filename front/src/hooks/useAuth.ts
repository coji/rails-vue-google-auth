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

  const credentials = useQuery<Credentials | null>({
    queryKey: ['auth', 'credentials'],
    enabled: false,
    initialData: null,
  })

  const getAuthHeaders = ():
    | {
        'access-token': string
        uid: string
        client: string
      }
    | {} => {
    if (credentials.data.value === null) return {}
    return {
      'access-token': credentials.data.value.accessToken,
      uid: credentials.data.value.uid,
      client: credentials.data.value.client,
    }
  }

  const me = useQuery<User | null>({
    queryKey: ['auth', 'me'],
    enabled: false,
    initialData: null,
  })

  /**
   * 認証情報ステートの更新
   * @param credentials
   */
  const updateCredentials = (credentials: Credentials | null) =>
    queryClient.setQueryData(['auth', 'credentials'], credentials)

  /**
   * ユーザー情報ステートの更新
   */
  const updateMe = (me: User | null) =>
    queryClient.setQueryData(['auth', 'me'], me)

  /**
   * email / password でログイン
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
        `${import.meta.env.VITE_API_ROOT}/api/v1/auth/sign_in`,
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
      queryClient.invalidateQueries()
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

  const googleLogin = useMutation({
    mutationFn: async ({ idToken }: { idToken: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ROOT}/api/v1/auth/google/sign_in`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_token: idToken }),
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
      queryClient.invalidateQueries()
      return true
    },
    onSuccess: () =>
      toast({
        title: 'Login Success',
        description: 'You are logged in.',
        variant: 'default',
        duration: 3000,
      }),
    onError: (error) =>
      toast({
        title: 'Login Error',
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      }),
  })

  /**
   * ログアウト
   */
  const logout = async () => {
    if (!credentials.data.value) {
      toast({
        title: 'Logout Error',
        description: 'Not logged in.',
        variant: 'destructive',
        duration: 3000,
      })
      return
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_ROOT}/api/v1/auth/sign_out`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      },
    )
    if (!response.ok) throw new Error(await response.text())

    updateCredentials(null)
    updateMe(null)
    queryClient.invalidateQueries()

    toast({
      title: 'Logout Success',
      description: 'You are logged out.',
      duration: 3000,
    })
  }

  return {
    googleLogin,
    login,
    logout,
    me,
    credentials,
    getAuthHeaders,
  }
}
