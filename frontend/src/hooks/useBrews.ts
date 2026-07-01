import { useEffect, useRef, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import { getBrews, getTopBrewers, createBrew as apiCreateBrew, giveKudos as apiGiveKudos } from '../api/client';
import type { Brew, TopBrewer, ConnectionStatus } from '../types';

export function useBrews() {
  const [brews, setBrews] = useState<Brew[]>([]);
  const [topBrewers, setTopBrewers] = useState<TopBrewer[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const refreshTopBrewers = useCallback(async () => {
    try {
      const top = await getTopBrewers();
      setTopBrewers(top);
    } catch {
      // silently ignore — top brewers are non-critical
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/hubs/brew')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();
    connectionRef.current = connection;

    connection.on('BrewAdded', (brew: Brew) => {
      setBrews((prev) => (prev.some((b) => b.id === brew.id) ? prev : [brew, ...prev]));
      void refreshTopBrewers();
    });

    connection.on('KudosUpdated', (id: number, newKudos: number) => {
      setBrews((prev) => prev.map((b) => (b.id === id ? { ...b, kudos: newKudos } : b)));
      void refreshTopBrewers();
    });

    connection.onreconnecting(() => setConnectionStatus('connecting'));
    connection.onreconnected(() => setConnectionStatus('connected'));
    connection.onclose(() => setConnectionStatus('disconnected'));

    async function init() {
      try {
        const [initialBrews, initialTop] = await Promise.all([getBrews(), getTopBrewers()]);
        if (!cancelled) {
          setBrews(initialBrews);
          setTopBrewers(initialTop);
        }
      } catch {
        // initial fetch failed; SignalR may still connect
      }

      try {
        await connection.start();
        if (!cancelled) setConnectionStatus('connected');
      } catch {
        if (!cancelled) setConnectionStatus('disconnected');
      }
    }

    void init();

    return () => {
      cancelled = true;
      void connection.stop();
    };
  }, [refreshTopBrewers]);

  const addBrew = useCallback(async (name: string): Promise<void> => {
    await apiCreateBrew(name);
    // BrewAdded event from SignalR will update the list
  }, []);

  const giveKudos = useCallback(async (id: number): Promise<void> => {
    await apiGiveKudos(id);
    // KudosUpdated event from SignalR will update the list
  }, []);

  return { brews, topBrewers, addBrew, giveKudos, connectionStatus };
}
