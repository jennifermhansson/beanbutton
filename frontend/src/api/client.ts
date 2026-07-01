import type { Brew, TopBrewer } from '../types';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function getBrews(): Promise<Brew[]> {
  return request<Brew[]>('/api/brews');
}

export function createBrew(name: string): Promise<Brew> {
  return request<Brew>('/api/brews', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function giveKudos(id: number): Promise<Brew> {
  return request<Brew>(`/api/brews/${id}/kudos`, {
    method: 'POST',
  });
}

export function getTopBrewers(): Promise<TopBrewer[]> {
  return request<TopBrewer[]>('/api/brews/top-brewers');
}

export async function getVapidPublicKey(): Promise<string> {
  const res = await fetch('/api/push/vapid-public-key')
  if (!res.ok) throw new Error('Failed to get VAPID key')
  const data = await res.json() as { publicKey: string }
  return data.publicKey
}

export async function subscribePush(subscription: PushSubscriptionJSON): Promise<void> {
  const res = await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      p256dh: subscription.keys?.p256dh,
      auth: subscription.keys?.auth,
    }),
  })
  if (!res.ok && res.status !== 200) throw new Error('Failed to subscribe')
}

export async function unsubscribePush(subscription: PushSubscriptionJSON): Promise<void> {
  await fetch('/api/push/subscribe', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      p256dh: subscription.keys?.p256dh,
      auth: subscription.keys?.auth,
    }),
  })
}
