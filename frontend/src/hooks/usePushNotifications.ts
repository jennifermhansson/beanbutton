import { useCallback, useEffect, useState } from 'react'
import { getVapidPublicKey, subscribePush, unsubscribePush } from '../api/client'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}

export type NotificationState = 'unsupported' | 'denied' | 'subscribed' | 'unsubscribed' | 'loading'

export function usePushNotifications() {
  const [state, setState] = useState<NotificationState>('loading')

  useEffect(() => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setState('unsupported')
      return
    }
    if (Notification.permission === 'denied') {
      setState('denied')
      return
    }
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setState(sub ? 'subscribed' : 'unsubscribed'))
      .catch(() => setState('unsubscribed'))
  }, [])

  const subscribe = useCallback(async () => {
    setState('loading')
    try {
      const publicKey = await getVapidPublicKey()
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })
      await subscribePush(sub.toJSON())
      setState('subscribed')
    } catch {
      setState('unsubscribed')
    }
  }, [])

  const unsubscribe = useCallback(async () => {
    setState('loading')
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await unsubscribePush(sub.toJSON())
        await sub.unsubscribe()
      }
      setState('unsubscribed')
    } catch {
      setState('subscribed')
    }
  }, [])

  return { state, subscribe, unsubscribe }
}
