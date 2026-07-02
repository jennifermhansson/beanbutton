/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('push', (event) => {
  if (!event.data) return
  const data = event.data.json() as { title: string; body: string; icon?: string }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon ?? '/favicon.svg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      if (clients.length > 0) {
        void clients[0].focus()
      } else {
        void self.clients.openWindow('/')
      }
    })
  )
})
