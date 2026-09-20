import { Link } from 'react-router-dom';
import { formatAmount, smallSalonPlans } from '../data/plans';
import './PricingTeaser.css';

export default function PricingTeaser() {
  return (
    <section className="teaser">
      <div className="container teaser__inner">
        <h2 className="teaser__title">使う機能に合わせて、選べます。</h2>
        <div className="teaser__body">
          <ul className="teaser__plans">
            {smallSalonPlans.map((plan) => (
              <li className="teaser__plan" key={plan.key}>
                <p className="teaser__plan-name">{plan.label}</p>
                <p className="teaser__price">
                  <span className="teaser__amount">{formatAmount(plan.amount)}</span>
                  <span className="teaser__unit">円 / 月</span>
                  <span className="teaser__tax">（税別）</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="teaser__aside">
            <p className="teaser__note">初期費用5,000円〜30,000円程度（税別）・契約期間の縛りなし</p>
            <Link className="teaser__link" to="/#pricing">
              料金プランを見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
