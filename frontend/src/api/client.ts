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
  return request<TopBrewer[]>('/api/brewers/top');
}

export async function getVapidPublicKey(): Promise<string> {
  const { publicKey } = await request<{ publicKey: string }>('/api/push/vapid-public-key');
  return publicKey;
}

// The browser's PushSubscription.toJSON() nests the keys; the API expects them flat.
function toSubscribeDto(sub: PushSubscriptionJSON) {
  return {
    endpoint: sub.endpoint,
    p256dh: sub.keys?.p256dh,
    auth: sub.keys?.auth,
  };
}

export async function subscribePush(sub: PushSubscriptionJSON): Promise<void> {
  const res = await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toSubscribeDto(sub)),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
}

export async function unsubscribePush(sub: PushSubscriptionJSON): Promise<void> {
  const res = await fetch('/api/push/subscribe', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toSubscribeDto(sub)),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
}
