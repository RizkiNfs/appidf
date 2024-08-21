export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('__t')

  if (!token.value) {
    return navigateTo('/')
  }
})
