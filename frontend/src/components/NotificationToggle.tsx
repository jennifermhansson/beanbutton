import { usePushNotifications } from "../hooks/usePushNotifications";

export function NotificationToggle() {
  const { state, subscribe, unsubscribe } = usePushNotifications();

  if (state === "unsupported") return null;

  const isLoading = state === "loading";
  const isSubscribed = state === "subscribed";
  const isDenied = state === "denied";

  return (
    <button
      className={`notif-toggle ${isSubscribed ? "notif-toggle--on" : ""} ${isDenied ? "notif-toggle--denied" : ""}`}
      onClick={isSubscribed ? unsubscribe : subscribe}
      disabled={isLoading || isDenied}
      title={
        isDenied
          ? "Notiser blockerade i webbläsaren"
          : isSubscribed
            ? "Stäng av notiser"
            : "Aktivera notiser"
      }
      aria-label={isSubscribed ? "Stäng av notiser" : "Aktivera notiser"}
    >
      <span className="notif-icon">
        {isSubscribed ? "🔔" : isDenied ? "🔕" : "🔔"}
      </span>
      <span className="notif-label">
        {isLoading
          ? "..."
          : isSubscribed
            ? "Meddela när kaffet är klart!"
            : isDenied
              ? "Blockerad"
              : "Notiser av"}
      </span>
    </button>
  );
}
