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
          <p>
            ※ 初期費用は導入内容に応じて5,000円〜30,000円程度（税別）です。初期設定の代行範囲やデータ移行の有無によって変わるため、お申し込み前にお見積りをご提示します。
          </p>
          <p>
            ※ お支払いはクレジットカードと銀行振込に対応しています。プランの変更は管理画面からいつでも行えます。
          </p>
        </div>
      </div>
    </section>
  );
}
