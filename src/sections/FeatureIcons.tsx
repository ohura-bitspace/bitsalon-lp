/*
 * 機能カードのアイコン。絵文字は OS ごとに絵柄が変わりトーンを揃えられないため、SVG で持つ。
 * 線は currentColor（--primary）、ミントの塗り（ficon__fill--solid）は1アイコン1か所に絞る。
 * viewBox 24×24・線幅 1.75・角丸で統一しているので、足すときはこの作法に合わせる。
 */
import type { ReactNode } from 'react';

export type FeatureIconName = 'line' | 'calendar' | 'block' | 'report' | 'website';

const shapes: Record<FeatureIconName, ReactNode> = {
  // LINE の吹き出しと、予約完了のチェック
  line: (
    <>
      <path className="ficon__fill" d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 20 17h-9l-4.5 3.5V17H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5Z" />
      <path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 20 17h-9l-4.5 3.5V17H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5Z" />
      <path d="m8.5 11.25 2.25 2.25 4.75-4.75" />
    </>
  ),
  // 予約表。入っている予約を1マスだけ塗る
  calendar: (
    <>
      <rect className="ficon__fill ficon__fill--solid" x="12.5" y="12" width="5" height="4" rx="1" />
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 3v4M16 3v4" />
      <path d="M7 13.5h2.5M7 17h2.5" />
    </>
  ),
  // 時計の一部を塗って「この時間は受け付けない」を示す
  block: (
    <>
      <path className="ficon__fill ficon__fill--solid" d="M12 12V3.75A8.25 8.25 0 0 1 20.25 12Z" />
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5V12l-3 2" />
    </>
  ),
  // 棒グラフと伸びの線
  report: (
    <>
      <rect className="ficon__fill ficon__fill--solid" x="15" y="9" width="4" height="11" rx="1" />
      <path d="M3.5 20.5h17" />
      <rect x="5" y="14" width="4" height="6" rx="1" />
      <rect x="10" y="11" width="4" height="9" rx="1" />
      <rect x="15" y="9" width="4" height="11" rx="1" />
      <path d="M5 9.5 10 6.5l4 1.5 5-4" />
    </>
  ),
  // ブラウザの枠と、写真・メニューの並ぶページ
  website: (
    <>
      <rect className="ficon__fill ficon__fill--solid" x="6" y="10.5" width="5.5" height="6" rx="1" />
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8h19" />
      <path d="M5.5 6h.01M8 6h.01" />
      <path d="M14 11.5h4.5M14 14.5h3" />
    </>
  ),
};

export default function FeatureIcon({ name }: { name: FeatureIconName }) {
  return (
    <svg
      className="ficon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}
