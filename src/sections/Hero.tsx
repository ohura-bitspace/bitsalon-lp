import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            <span>常連さまの予約を、</span>
            <span>LINEひとつで。</span>
          </h1>
          <p className="hero__lead">
            予約受付から顧客カルテ・会計・売上分析まで。小規模サロンの毎日を、ひとつのシステムにまとめました。
          </p>
          <ul className="hero__tags" aria-label="bitSalonの特徴">
            <li className="hero__tag">アプリのインストール不要</li>
            <li className="hero__tag">初期費用 0円</li>
            <li className="hero__tag">契約期間の縛りなし</li>
          </ul>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              話を聞いてみる
            </a>
            <a className="btn btn--secondary" href="#pricing">
              料金を見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
