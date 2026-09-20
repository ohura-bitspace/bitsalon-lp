import { trackEvent } from '../analytics';
import './CtaSection.css';

export default function CtaSection() {
  return (
    <section id="contact" className="section">
      <div className="container cta">
        <div className="cta__panel">
          <h2 className="cta__title">まずは、話を聞いてみませんか</h2>
          <p className="cta__lead">
            実際の画面をご覧いただきながら、サロンの運用に合うかをご説明します。導入をお決めになっていなくても構いません。
          </p>
          <div className="cta__actions">
            {/* 公開前に LINE公式アカウントのURLへ差し替える */}
            <a
              className="btn btn--primary cta__button"
              href="[LINE_OA_URL]"
              onClick={() => trackEvent('line_cta_click')}
            >
              LINEで相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
