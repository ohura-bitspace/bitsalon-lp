/*
 * 料金プランの定義。料金セクションとティーザーで同じ金額を出すため、ここを単一の出どころにする。
 * 表示形式（¥付き・単位の有無）はセクションごとに違うので、金額は数値で持ち整形は参照側で行う。
 */

export type Plan = {
  key: string;
  label: string;
  /** 月額（税別）の円 */
  amount: number;
  features: string[];
  badge?: string;
};

export type PlanGroup = {
  key: string;
  label: string;
  plans: Plan[];
  /** true のグループは折りたたみ（初期表示は閉じた状態）で出す */
  collapsible?: boolean;
};

/** 4800 → 「4,800」。閲覧者のロケールで区切り文字が変わらないよう ja-JP 固定 */
export function formatAmount(amount: number) {
  return amount.toLocaleString('ja-JP');
}

/** ティーザーなど、個人・小規模サロン向けだけを出す箇所から参照する */
export const smallSalonPlans: Plan[] = [
  {
    key: 'standard',
    label: 'スタンダード',
    amount: 4800,
    features: [
      '予約管理（カレンダー・ネット予約）',
      '顧客管理（電子カルテ）',
      'メニュー・スタッフ管理',
      'ホームページ（基本設定）',
      '売上レポート（基本）',
    ],
  },
  {
    key: 'pro',
    label: 'プロ',
    amount: 9600,
    badge: 'おすすめ',
    features: [
      'スタンダードの全機能',
      'メッセージ機能',
      'ホームページ（拡張設定）',
      '予約リマインダー（LINE通知）',
      '回数券（前売り）',
      '売上レポート（詳細分析）',
    ],
  },
];

const multiLocationPlans: Plan[] = [
  {
    key: 'business-standard',
    label: 'ビジネス スタンダード',
    amount: 9000,
    badge: '2店舗込み',
    features: ['スタンダードの全機能', '複数店舗の一括管理', '追加店舗 +¥4,000/月（税別）'],
  },
  {
    key: 'business-pro',
    label: 'ビジネス プロ',
    amount: 18000,
    badge: '2店舗込み',
    features: [
      'プロの全機能',
      '複数店舗の一括管理',
      '優先サポート',
      '追加店舗 +¥8,000/月（税別）',
    ],
  },
];

export const planGroups: PlanGroup[] = [
  {
    key: 'small-salon',
    label: '個人・小規模サロン向け',
    plans: smallSalonPlans,
  },
  {
    key: 'multi-location',
    label: '複数店舗向け',
    collapsible: true,
    plans: multiLocationPlans,
  },
];
