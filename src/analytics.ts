/*
 * Googleアナリティクス（GA4）。
 * 測定IDは .env.production の VITE_GA_ID から読む。未設定のときは何も読み込まない。
 * （壊れたタグを公開しないため。測定ID自体は公開される情報なのでコミットしてよい）
 */

const measurementId: string | undefined = import.meta.env.VITE_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (!measurementId || window.gtag) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  // ページビューは画面遷移ごとに自前で送るため、読み込み時の自動送信は止める
  window.gtag('config', measurementId, { send_page_view: false });
}

export function trackPageView(title: string) {
  window.gtag?.('event', 'page_view', {
    page_title: title,
    page_path: window.location.pathname,
    page_location: window.location.href,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.('event', name, params);
}
