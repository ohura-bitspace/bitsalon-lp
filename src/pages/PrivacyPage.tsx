import { Link } from 'react-router-dom';
import './PrivacyPage.css';

/*
 * プライバシーポリシー。Stripe のウェブサイト要件（掲載必須）と、
 * Google アナリティクス・Google フォームの利用に伴う説明責任のために置く。
 * メールアドレスは LP 上に直接載せない方針のため、窓口は特商法ページの該当行へ送る。
 */

const ESTABLISHED = '2026年9月21日';

export default function PrivacyPage() {
  return (
    <section className="section privacy">
      <div className="container">
        <h1 className="section__title">プライバシーポリシー</h1>

        <div className="privacy__body">
          <p>
            bitSpace（以下「当方」といいます）は、サロン向け予約・顧客管理サービス bitSalon
            （以下「本サービス」といいます）および本サイトにおける個人情報の取扱いについて、次のとおり定めます。
          </p>

          <section className="privacy__section">
            <h2 className="privacy__heading">1. 事業者</h2>
            <ul className="privacy__list">
              <li className="privacy__item">事業者名: bitSpace（個人事業主）</li>
              <li className="privacy__item">運営責任者: 大浦 智史</li>
              <li className="privacy__item">
                所在地および電話番号: ご請求いただいた場合に遅滞なく開示いたします
              </li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">2. 取得する情報</h2>
            <ul className="privacy__list">
              <li className="privacy__item">
                お問い合わせフォームを通じてご入力いただく、お名前、メールアドレス、お問い合わせ内容
              </li>
              <li className="privacy__item">
                本サイトの閲覧にあたり自動的に送信される、Cookie、閲覧したページ、参照元、ご利用の端末およびブラウザに関する情報
              </li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">3. 利用目的</h2>
            <ul className="privacy__list">
              <li className="privacy__item">お問い合わせへの回答およびご連絡</li>
              <li className="privacy__item">本サービスのご案内およびお見積りの作成</li>
              <li className="privacy__item">本サイトの利用状況の把握と改善</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">4. 第三者への提供</h2>
            <p>
              ご本人の同意がある場合および法令に基づく場合を除き、取得した個人情報を第三者に提供しません。
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">5. 外部サービスの利用</h2>
            <p>
              本サイトでは、お問い合わせの受付に Google フォーム、利用状況の把握に Google アナリティクスを利用しています。
              Google アナリティクスは Cookie を用いて情報を収集しますが、個人を特定する情報は含まれません。
              収集を停止したい場合は、Google が提供する
              <a
                href="https://tools.google.com/dlpage/gaoptout?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
              >
                オプトアウト アドオン
              </a>
              をご利用ください。Google におけるデータの取扱いは
              <a
                href="https://policies.google.com/privacy?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
              >
                同社のプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">6. 本サービスでお預かりする情報</h2>
            <p>
              本サービスをご利用のサロン様が登録された、そのお客様に関する情報（氏名、連絡先、来店履歴等）に関する権利は、
              サロン様に帰属します。当方は、サロン様との利用契約に基づく個人情報の取扱いの委託として、
              本サービスの提供、保守および改善に必要な範囲でのみこれを取り扱い、その範囲を超えて利用しません。
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">7. 安全管理措置</h2>
            <p>
              本サイトおよび本サービスの通信は暗号化（HTTPS）しています。
              取得した情報へのアクセスは、業務上必要な範囲に限定して管理します。
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">8. 開示・訂正・削除のご請求</h2>
            <p>
              取得した個人情報について、ご本人からの開示、訂正、利用停止または削除のご請求があった場合は、
              法令に従って速やかに対応いたします。窓口は次項のとおりです。
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">9. お問い合わせ窓口</h2>
            <ul className="privacy__list">
              <li className="privacy__item">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScUYArOHeIWiO_UFxU2BRvBQ3WHg7f0j1NF3ozPvVM88UeadA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  お問い合わせフォーム
                </a>
              </li>
              <li className="privacy__item">
                メール（アドレスは
                <Link to="/tokushoho#contact-email">特定商取引法に基づく表記</Link>
                に記載しています）
              </li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__heading">10. 本ポリシーの改定</h2>
            <p>内容を変更する場合は、本ページに変更後の内容を掲載します。</p>
          </section>

          <p className="privacy__established">制定日: {ESTABLISHED}</p>
        </div>
      </div>
    </section>
  );
}
