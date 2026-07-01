export interface Brew {
  id: number;
  name: string;
  brewedAt: string; // ISO
  kudos: number;
}

export interface TopBrewer {
  name: string;
  totalKudos: number;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';
