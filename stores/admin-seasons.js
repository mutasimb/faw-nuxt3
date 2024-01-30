import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';
import { useSeasonsStore } from '@/stores/seasons';

export const useAdminSeasonsStore = defineStore('admin-seasons', () => {
  const
    storeSeasons = useSeasonsStore(),
    storeSnackbar = useSnackbarStore(),
    { seasons } = storeToRefs(storeSeasons),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    dialogFormSeason = ref(false),

    code = ref(''),
    name = ref(''),
    season = ref(null),
    nTrap = ref(null),
    iY = ref(null),
    im = ref(null),
    id = ref(null)

  const
    postNewSeason = async () => {
      const { data, error } = await useFetch('/api/admin/seasons/new', {
        method: 'post',
        body: {
          code: code.value,
          name: name.value,
          season: season.value,
          nTrap: nTrap.value,
          iY: iY.value,
          im: im.value,
          id: id.value
        }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { savedSeason } = toRaw(data.value)
        seasons.value.push(savedSeason)
      }
    },
    getCollectors = async seasonId => {
      const { data, error } = await useFetch(`/api/admin/collectors/${ seasonId }`)

      if (error.value) {
        collectors.value = []

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { users } = toRaw(data.value)
        collectors.value = users
      }
    },
    postNewUsers = async ({ season, csv, batch, password }) => {
      const { data, error } = await useFetch('/api/admin/collectors/new', {
        method: 'post',
        body: { season, csv: [...csv.map(el => toRaw(el))], batch, password }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { users } = toRaw(data.value)
        collectors.value = users
      }
    },
    changePasswordCollector = async user => {
      const { data, error } = await useFetch('/api/admin/collectors/change-password', {
        method: 'patch',
        body: { id: user._id }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { savedpassword } = toRaw(data.value)

        displayDialogPassword.value = true
        displayPasswordUserName.value = user.name
        displayPasswordUserPhone.value = user.phone
        displayPassword.value = savedpassword
      }
    }
    // postEditAdmin = async () => {
    //   const { data, error } = await useFetch('/api/admin/edit', {
    //     method: 'post',
    //     body: { id: id.value, ...formData.value }
    //   })

    //   if (error.value) {
    //     messageType.value = 'error'
    //     message.value = error.value.statusMessage
    //   }

    //   if (data.value) {
    //     const
    //       { savedUser } = toRaw(data.value),
        
    //       index = usersAdmin.value.findIndex(el => el._id === savedUser._id)
    //     usersAdmin.value.splice(index, 1, savedUser)
    //   }
    // },
    // deleteUserAdmin = async user => {
    //   const { data, error } = await useFetch('/api/admin/remove', {
    //     method: 'delete',
    //     body: { id: user._id }
    //   })

    //   if (error.value) {
    //     messageType.value = 'error'
    //     message.value = error.value.statusMessage
    //   }

    //   if (data.value) {
    //     const index = usersAdmin.value.findIndex(el => el._id === user._id)
    //     usersAdmin.value.splice(index, 1)
    //   }
    // },
    // changePasswordUserAdmin = async user => {
    //   const { data, error } = await useFetch('/api/admin/change-password', {
    //     method: 'patch',
    //     body: { id: user._id }
    //   })

    //   if (error.value) {
    //     messageType.value = 'error'
    //     message.value = error.value.statusMessage
    //   }

    //   if (data.value) {
    //     const { savedpassword } = toRaw(data.value)

    //     displayDialogPassword.value = true
    //     displayPasswordUserName.value = user.name
    //     displayPasswordUserPhone.value = user.phone
    //     displayPassword.value = savedpassword
    //   }
    // },
    // $reset = () => {
    //   usersAdmin.value = []
    // };

  return {
    dialogFormSeason,

    code,
    name,
    season,
    nTrap,
    iY,
    im,
    id,

    postNewSeason
  }
})
