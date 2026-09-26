import { trackEvent } from '../analytics';
import Phrases from '../components/Phrases';
import './CtaSection.css';

export default function CtaSection() {
  return (
    <section id="contact" className="section">
      <div className="container cta">
        <div className="cta__panel">
          <h2 className="cta__title">
            <Phrases>まずは、|話を聞いてみませんか</Phrases>
          </h2>
          <p className="cta__lead">
            <Phrases>
              実際の画面を|ご覧いただきながら、|サロンの運用に|合うかを|ご説明します。|導入を|お決めになっていなくても|構いません。
            </Phrases>
          </p>
          <div className="cta__actions">
            <a
              className="btn btn--primary cta__button"
              href="https://docs.google.com/forms/d/e/1FAIpQLScUYArOHeIWiO_UFxU2BRvBQ3WHg7f0j1NF3ozPvVM88UeadA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('form_cta_click')}
            >
              フォームで問い合わせる
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
