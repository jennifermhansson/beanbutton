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
