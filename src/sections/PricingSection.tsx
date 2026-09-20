import type { Plan } from '../data/plans';
import { formatAmount, planGroups } from '../data/plans';
import './PricingSection.css';

function PlanCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="pricing__cards">
      {plans.map((plan) => (
        <article className="pricing__card" key={plan.key}>
          <div className="pricing__card-header">
            <h4 className="pricing__plan-name">{plan.label}</h4>
            {plan.badge ? <span className="pricing__badge">{plan.badge}</span> : null}
          </div>
          <p className="pricing__price">
            <span className="pricing__amount">¥{formatAmount(plan.amount)}</span>
            <span className="pricing__term">月額（税別）</span>
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
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="section section--tinted">
      <div className="container pricing">
        <h2 className="section__title">料金プラン</h2>
        <p className="section__lead">
          初期費用は0円、契約期間の縛りもありません。必要な機能に合わせて選べます。
        </p>

        <div className="pricing__groups">
          {planGroups.map((group) =>
            group.collapsible ? (
              <details className="pricing__group pricing__group--collapsible" key={group.key}>
                <summary className="pricing__toggle">{group.label}プランを見る</summary>
                <div className="pricing__toggle-body">
                  <PlanCards plans={group.plans} />
                </div>
              </details>
            ) : (
              <section
                className="pricing__group"
                key={group.key}
                aria-labelledby={`${group.key}-heading`}
              >
                <h3 className="pricing__group-title" id={`${group.key}-heading`}>
                  {group.label}
                </h3>
                <PlanCards plans={group.plans} />
              </section>
            ),
          )}
        </div>

        <div className="pricing__notes">
          <p>※ 表示価格はすべて税別です。</p>
          <p>※ お支払いはクレジットカード（Stripe決済）に対応しています。プランの変更は管理画面からいつでも行えます。</p>
        </div>
      </div>
    </section>
  );
}
