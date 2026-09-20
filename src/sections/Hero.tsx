import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__headline">
          <h1 className="hero__title">
            <span>予約も、カルテも。</span>
            <span>もっとかんたんに。</span>
            <span>もっと手ごろに。</span>
          </h1>
        </div>
        <div className="hero__aside">
          <p className="hero__lead">
            LINEから入った予約を、
            <br />
            見やすい予約表へ。
            <br />
            カルテも来店履歴も、ひとつに。
          </p>
          <Link className="btn btn--primary hero__cta" to="/#contact">
            画面を見ながら相談する
          </Link>
          <p className="hero__note">小規模サロン向け 予約・顧客管理アプリ</p>
        </div>
      </div>
    </section>
  );
}
