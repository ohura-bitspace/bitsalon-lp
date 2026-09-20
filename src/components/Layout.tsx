import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../analytics';
import Footer from './Footer';
import Header from './Header';

/* 静的な head に書くと全ページ同じ題名になるため、遷移ごとに入れ替える */
const pageTitles: Record<string, string> = {
  '/': 'bitSalon｜LINEで完結するサロン予約・顧客管理',
  '/tokushoho': '特定商取引法に基づく表記｜bitSalon',
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { hash, key, pathname } = useLocation();

  // React Router のクライアント遷移ではブラウザのハッシュスクロールが働かないため、
  // アンカー先へのスクロールを自前で行う。同じリンクを再度押した場合も動くよう key を監視する。
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));

      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash, key, pathname]);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const title = pageTitles[pathname] ?? pageTitles['/'];
    document.title = title;

    // 検索サイトに「ページごとに別のURL」と伝える。現在のURLから組み立てるのでドメイン移行後もそのまま使える。
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = `${window.location.origin}${window.location.pathname}`;

    trackPageView(title);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
