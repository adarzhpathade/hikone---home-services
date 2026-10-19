// Lets a link hold a view transition open until Next has rendered the new page.
const SETTLE_TIMEOUT_MS = 1500;

let pendingResolve: (() => void) | null = null;

export function waitForNavigation(): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(done, SETTLE_TIMEOUT_MS);
    function done() {
      clearTimeout(timer);
      if (pendingResolve === done) pendingResolve = null;
      resolve();
    }
    pendingResolve = done;
  });
}

export function settleNavigation(): void {
  pendingResolve?.();
}

let currentPath: string | null = null;
let previousPath: string | null = null;

export function recordPath(pathname: string): void {
  if (pathname === currentPath) return;
  previousPath = currentPath;
  currentPath = pathname;
}

// True when going back in history lands on the given page, so the browser can
// restore the scroll position there instead of starting at the top.
export function isPreviousPath(pathname: string): boolean {
  return previousPath === pathname;
}
