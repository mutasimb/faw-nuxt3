import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useUserStore = defineStore('user', () => {
  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    user = ref(null),
    
    getUser = async () => {
      console.log("getUser: initiate useFetch")
      const { data, error } = await useFetch('/api/auth/user')
      console.log("getUser: after useFetch")

      if(error.value) {
        console.log("getUser: error")

        user.value = null

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if(data.value) {
        console.log("getUser: data")

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
