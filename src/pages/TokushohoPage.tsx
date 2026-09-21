import './TokushohoPage.css';

type Row = {
  label: string;
  value: string;
  /** フッターから直接飛ぶ行に付けるアンカー */
  anchor?: string;
};

const rows: Row[] = [
  { label: '販売事業者', value: 'bitSpace' },
  { label: '運営責任者', value: '大浦 智史' },
  { label: '所在地', value: 'ご請求いただいた場合に遅滞なく開示いたします' },
  { label: '電話番号', value: 'ご請求いただいた場合に遅滞なく開示いたします' },
  { label: 'メールアドレス', value: 'bitsalon@bitspace.jp', anchor: 'contact-email' },
  { label: '販売価格', value: '各プランページに記載の金額（日本円・税別）' },
  {
    label: '商品代金以外の必要料金',
    value:
      '初期費用 5,000円〜30,000円程度（税別）。導入内容に応じてお見積りのうえ、お申し込み前にご提示します。'
      + '銀行振込をご利用の場合、振込手数料はお客様のご負担となります。',
  },
  { label: 'お支払い方法', value: 'クレジットカード決済、銀行振込' },
  { label: 'お支払い時期', value: '各プランの契約周期に応じた前払い' },
  {
    label: 'サービス提供時期',
    value: '申込み・決済確認後（銀行振込の場合は入金確認後）、3営業日以内にアカウントを発行',
  },
  {
    label: '返品・キャンセルについて',
    value:
      'サービスの性質上、提供開始後の返品・返金は承っておりません。解約は管理画面からいつでも行え、'
      + 'お支払い済みの期間の末日までご利用いただけます（日割りの返金は行いません）。'
      + '当方に起因する不具合によりサービスをご利用いただけなかった場合は、個別に対応いたします。',
  },
  { label: '動作環境', value: 'LINEアプリが利用可能なスマートフォン、または管理画面用のWebブラウザ' },
  { label: '事業者の種別', value: '個人事業主' },
];

export default function TokushohoPage() {
  return (
    <section className="section tokushoho">
      <div className="container">
        <h1 className="section__title">特定商取引法に基づく表記</h1>
        <table className="tokushoho__table">
          <tbody>
            {rows.map((row) => {
              const isPlaceholder = row.value.includes('[');

              return (
                <tr className="tokushoho__row" key={row.label} id={row.anchor}>
                  <th className="tokushoho__label" scope="row">
                    {row.label}
                  </th>
                  <td className="tokushoho__value">
                    <span className={isPlaceholder ? 'tokushoho__placeholder' : undefined}>
                      {row.value}
                    </span>
                    {isPlaceholder ? <span className="tokushoho__badge">未確定</span> : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
