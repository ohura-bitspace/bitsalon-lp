import { Link } from 'react-router-dom';
import { formatAmount, smallSalonPlans } from '../data/plans';
import Phrases from '../components/Phrases';
import './Hero.css';

/* 価格の出どころは plans.ts に一本化する。ここでは最安プランの月額を「〜から」で見せる */
const lowestAmount = formatAmount(Math.min(...smallSalonPlans.map((plan) => plan.amount)));

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
            <Phrases>LINEから入った予約を、</Phrases>
            <br />
            <Phrases>見やすい予約表へ。</Phrases>
            <br />
            <Phrases>カルテも|来店履歴も、|ひとつに。</Phrases>
          </p>
          <Link className="btn btn--primary hero__cta" to="/#contact">
            画面を見ながら相談する
          </Link>
          <p className="hero__note">
            <Phrases>{`小規模サロン向け 予約・顧客管理アプリ／|月額${lowestAmount}円（税別）から・|初期費用別途`}</Phrases>
          </p>
        </div>
      </div>
    </section>
  );
}
