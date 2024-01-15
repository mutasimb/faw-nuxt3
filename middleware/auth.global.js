import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(to => {
  const
    token = useCookie('token'),

    storeAuth = useAuthStore(),
    { isLoggedIn } = storeToRefs(storeAuth)

  if (token.value) isLoggedIn.value = true

  if (token.value && (!('auth' in to.meta) || !to.meta.auth)) return navigateTo('/user')

  if (!token.value && to.meta.auth) {
    abortNavigation()
    return navigateTo('/')
  }
});
