import type { ConnectionStatus as ConnectionStatusType } from '../types';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
}

const STATUS_CONFIG: Record<
  ConnectionStatusType,
  { label: string; dotClass: string }
> = {
  connected: { label: 'LIVE', dotClass: 'conn-dot--live' },
  connecting: { label: 'SYNC', dotClass: 'conn-dot--sync' },
  disconnected: { label: 'OFFLINE', dotClass: 'conn-dot--offline' },
};

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  const { label, dotClass } = STATUS_CONFIG[status];

  return (
    <div className="connection-status" role="status" aria-live="polite">
      <span className={`conn-dot ${dotClass}`} aria-hidden="true" />
      <span className="conn-label">{label}</span>
    </div>
  );
}
