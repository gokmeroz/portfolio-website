// Feature flags — flip these to change optional behavior without touching
// component code.
export const ENABLE_BOOT_SEQUENCE = true;

// No-op analytics stub. The site has no analytics provider wired up yet;
// every call site below already passes a stable event name + props object,
// so swapping this for a real provider later is a one-line change.
export function trackEvent(name: string, props?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.debug("[trackEvent]", name, props);
  }
}
