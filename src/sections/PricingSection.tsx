import './PricingSection.css';

type Plan = {
  key: string;
  label: string;
  price: string;
  term: string;
  features: string[];
  badge?: string;
};

type PlanGroup = {
  key: string;
  label: string;
  plans: Plan[];
};

const planGroups: PlanGroup[] = [
  {
    key: 'small-salon',
    label: '個人・小規模サロン向け',
    plans: [
      {
        key: 'standard',
        label: 'スタンダード',
        price: '¥4,800',
        term: '月額（税別）',
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
        price: '¥9,600',
        term: '月額（税別）',
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
    ],
  },
  {
    key: 'multi-location',
    label: '複数店舗向け',
    plans: [
      {
        key: 'business-standard',
        label: 'ビジネス スタンダード',
        price: '¥9,000',
        term: '月額（税別）',
        badge: '2店舗込み',
        features: [
          'スタンダードの全機能',
          '複数店舗の一括管理',
          '追加店舗 +¥4,000/月（税別）',
        ],
      },
      {
        key: 'business-pro',
        label: 'ビジネス プロ',
        price: '¥18,000',
        term: '月額（税別）',
        badge: '2店舗込み',
        features: [
          'プロの全機能',
          '複数店舗の一括管理',
          '優先サポート',
          '追加店舗 +¥8,000/月（税別）',
        ],
      },
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section section--tinted">
      <div className="container pricing">
        <h2 className="section__title">料金プラン</h2>
        <p className="section__lead">
          初期費用は0円、契約期間の縛りもありません。店舗数と必要な機能に合わせて選べます。
        </p>

        <div className="pricing__groups">
          {planGroups.map((group) => (
            <section className="pricing__group" key={group.key} aria-labelledby={`${group.key}-heading`}>
              <h3 className="pricing__group-title" id={`${group.key}-heading`}>
                {group.label}
              </h3>
              <div className="pricing__cards">
                {group.plans.map((plan) => (
                  <article
                    className={`pricing__card${plan.badge === 'おすすめ' ? ' pricing__card--recommended' : ''}`}
                    key={plan.key}
                  >
                    <div className="pricing__card-header">
                      <h4 className="pricing__plan-name">{plan.label}</h4>
                      {plan.badge ? <span className="pricing__badge">{plan.badge}</span> : null}
                    </div>
                    <p className="pricing__price">
                      <span className="pricing__amount">{plan.price}</span>
                      <span className="pricing__term">{plan.term}</span>
                    </p>
                    <ul className="pricing__features">
                      {plan.features.map((feature) => (
                        <li className="pricing__feature" key={feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="pricing__notes">
          <p>※ 表示価格はすべて税別です。</p>
          <p>※ お支払いはクレジットカード（Stripe決済）に対応しています。プランの変更は管理画面からいつでも行えます。</p>
        </div>
      </div>
    </section>
  );
}
