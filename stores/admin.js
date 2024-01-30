import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useAdminStore = defineStore('admin', () => {
  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    usersAdmin = ref([]),
    usersAdminSorted = computed(() => {
      return !usersAdmin.value || !usersAdmin.value.length ? []
        : usersAdmin.value
        .map(el => ({
          ...el,
          roleIndex: el.role === 'Super Admin' ? 1
            : el.role === 'Moderator' ? 2
              : el.role === 'User Manager' ? 3 : null
        }))
        .sort((a, b) => a.roleIndex > b.roleIndex ? 1 : -1)
    })

  const
    name =  ref(''),
    role =  ref(null),
    title =  ref(''),
    org =  ref(''),
    phone =  ref(''),
    formData = computed(() => ({
      name: name.value,
      role: role.value,
      title: title.value,
      org: org.value,
      phone: phone.value
    }))

  const
    id = ref(''),
    displayDialogEdit = ref(false)

  const
    displayDialogPassword = ref(false),
    displayPasswordUserName = ref(''),
    displayPasswordUserPhone = ref(''),
    displayPassword = ref('')

  const
    getUsersAdmin = async () => {
      const { data, error } = await useFetch('/api/admin/users')

      if (error.value) {
        usersAdmin.value = []

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { admins } = toRaw(data.value)
        usersAdmin.value = admins
      }
    },
    postNewAdmin = async () => {
      const { data, error } = await useFetch('/api/admin/new', {
        method: 'post',
        body: formData.value
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { savedUser, password } = toRaw(data.value)
        usersAdmin.value.push(savedUser)

        displayPasswordUserName.value = savedUser.name
        displayPasswordUserPhone.value = savedUser.phone
        displayPassword.value = password
      }
    },
    postEditAdmin = async () => {
      const { data, error } = await useFetch('/api/admin/edit', {
        method: 'post',
        body: { id: id.value, ...formData.value }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const
          { savedUser } = toRaw(data.value),
        
          index = usersAdmin.value.findIndex(el => el._id === savedUser._id)
        usersAdmin.value.splice(index, 1, savedUser)
      }
    },
    deleteUserAdmin = async user => {
      const { data, error } = await useFetch('/api/admin/remove', {
        method: 'delete',
        body: { id: user._id }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const index = usersAdmin.value.findIndex(el => el._id === user._id)
        usersAdmin.value.splice(index, 1)
      }
    },
    changePasswordUserAdmin = async user => {
      const { data, error } = await useFetch('/api/admin/change-password', {
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
    },
    $reset = () => {
      usersAdmin.value = []
    };

  return {
    usersAdmin,
    usersAdminSorted,

    name,
    role,
    title,
    org,
    phone,

    id,
    displayDialogEdit,

    displayDialogPassword,
    displayPasswordUserName,
    displayPasswordUserPhone,
    displayPassword,
    
    getUsersAdmin,
    postNewAdmin,
    postEditAdmin,
    deleteUserAdmin,
    changePasswordUserAdmin,
    $reset
  }
})
