import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__headline">
          <p className="hero__eyebrow">B / DAILY TOOL</p>
          <h1 className="hero__title">
            <span>予約も、カルテも。</span>
            <span>サロンの一日が、</span>
            <span>ひと目でわかる。</span>
          </h1>
        </div>
        <div className="hero__aside">
          <p className="hero__lead">
            LINEから入った予約を、
            <br />
            いつもの予約表へ。
            <br />
            お客様の情報も、ひとつに。
          </p>
          <Link className="btn btn--primary hero__cta" to="/#contact">
            画面を見ながら相談する
          </Link>
          <p className="hero__note">小規模サロン向け 予約・顧客管理システム</p>
        </div>
      </div>
    </section>
  );
}
