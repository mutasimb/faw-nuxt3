import { defineStore, storeToRefs } from 'pinia';
import * as d3 from 'd3-time-format'

import { useSnackbarStore } from '@/stores/snackbar';
import { useSeasonsStore } from '@/stores/seasons';

export const useAdminSeasonsStore = defineStore('admin-seasons', () => {
  const
    storeSeasons = useSeasonsStore(),
    storeSnackbar = useSnackbarStore(),
    { seasons } = storeToRefs(storeSeasons),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    seasonsList = computed(() => seasons.value
      .map(el => ({
        _id: el._id,
        code: el.code,
        name: el.name,
        season: el.season,
        crops: el.crops.join(', '),
        nTrap: el.nTrap,
        date: d3.timeParse('%Y/%-m/%-d')(`${el.iY}/${el.im}/${el.id}`),
        default: el.default ? '\u2713' : '-'
      }))
      .sort((a, b) => a.date > b.date ? -1 : 1)
    )

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

  return {
    seasonsList,

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
