import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useAuthStore = defineStore('auth', () => {
  const
    router = useRouter(),
    token = useCookie('token')

  const
    storeSnackbar = useSnackbarStore(),
    { message, messageType } = storeToRefs(storeSnackbar)

  const
    isPasswordDisabled = ref(true),
    isLoggedIn = ref(false),

    checkNumber = async ({ phone }) => {
      const { data, error } = await useFetch('/api/auth/check-number', {
        method: 'post',
        body: { phone }
      })

      if(error.value) {
        isPasswordDisabled.value = true

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if(data.value) {
        isPasswordDisabled.value = false

        messageType.value = 'success'
        message.value = 'Phone number verified, please enter your password'
      }
    },
    login = async ({ phone, password }) => {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'post',
        body: { phone, password }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { token: tokenResponse } = toRaw(data.value)
        token.value = tokenResponse

        messageType.value = 'success'
        message.value = 'Successfully logged in'

        router.push('/user')
      }
    },
    logout = () => {
      token.value = null

      router.push('/')
    },
    $reset = () => {
      isPasswordDisabled.value = true
      isLoggedIn.value = false
    }

  return {
    isPasswordDisabled,
    isLoggedIn,

    checkNumber,
    login,
    logout,

    $reset
  }
})
