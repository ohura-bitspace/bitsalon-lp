import './FeatureList.css';

type Feature = {
  icon: string;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: '📱',
    title: 'LINEの友だち登録だけで予約が完結',
    body: 'アプリのインストールも会員登録も不要です。お客様は使い慣れたLINEから数タップで予約できるので、年齢を問わず使っていただけます。',
  },
  {
    icon: '📅',
    title: '予約と顧客を管理画面でまとめて管理',
    body: '週・日単位のカレンダーで予約を一元管理。来店履歴や施術メモは顧客カルテに集約されるので、次回の接客にそのまま生かせます。',
  },
  {
    icon: '🔒',
    title: 'プライベートスケジュールのブロック',
    body: 'スタッフの休みや私用の時間を、管理画面から数タップでブロック。予約を受けたくない枠に予約が入る心配がありません。',
  },
  {
    icon: '📊',
    title: '来店分析レポート',
    body: '来店頻度や期間で絞り込んで、お客様の通い方を数字で把握。感覚ではなく実績にもとづいて判断できます。',
  },
  {
    icon: '🌐',
    title: 'サロンホームページの作成・公開',
    body: '写真・メニュー・スタッフ紹介を載せた予約ページ一体型のサロンHPを、管理画面から公開できます。制作費・保守費はかかりません。',
  },
];

export default function FeatureList() {
  return (
    <section id="features" className="section">
      <div className="container features">
        <h2 className="section__title">サロンの毎日を、これひとつで</h2>
        <p className="section__lead">
          予約の受付から、カルテ・分析・ホームページまで。必要な機能だけを、使いやすい形でまとめています。
        </p>
        <div className="features__grid">
          {features.map((feature) => (
            <article className="features__card" key={feature.title}>
              <span className="features__icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="features__title">{feature.title}</h3>
              <p className="features__body">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
