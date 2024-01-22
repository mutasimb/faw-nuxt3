import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(to => {
  const
    token = useCookie('token'),

    storeAuth = useAuthStore(),
    storeUser = useUserStore(),
    { isLoggedIn } = storeToRefs(storeAuth),
    { user } = storeToRefs(storeUser)

  if (!token.value) {

    isLoggedIn.value = false
    if (to.meta.auth) {
      abortNavigation()
      return navigateTo('/')
    }

  } else if (!(!user.value)) {

    isLoggedIn.value = true
    const { role } = toRaw(user.value)

    if (!('auth' in to.meta) || !to.meta.auth) {
      return navigateTo('/user')
    } else if ('admin' in to.meta && to.meta.admin && role === 'Data') {
      abortNavigation()
      return navigateTo('/user')
    }
  }
});
