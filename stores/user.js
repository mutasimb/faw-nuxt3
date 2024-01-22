import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useUserStore = defineStore('user', () => {
  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    user = ref(null),
    
    getUser = async () => {
      const { data, error } = await useFetch('/api/auth/user')

      if (error.value) {
        user.value = null

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { user: userResponse } = data.value
        user.value = userResponse
      }
    },
    $reset = () => {
      user.value = null
    };

  return {
    user,
    getUser,

    $reset
  }
})
