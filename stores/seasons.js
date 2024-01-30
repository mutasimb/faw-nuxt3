import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useSeasonsStore = defineStore('seasons', () => {
  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    seasons = ref([])

  const
    getSeasons = async () => {
      const { data, error } = await useFetch('/api/seasons')

      if (error.value) {
        seasons.value = []

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { seasons: resData } = toRaw(data.value)
        seasons.value = resData
      }
    }

  return {
    seasons,

    getSeasons
  }
})
