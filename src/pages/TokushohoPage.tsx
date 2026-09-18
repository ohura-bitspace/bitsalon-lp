import './TokushohoPage.css';

type Row = {
  label: string;
  value: string;
};

const rows: Row[] = [
  { label: '販売事業者', value: 'bitSpace' },
  { label: '運営統括責任者', value: '[代表者氏名]' },
  { label: '所在地', value: 'ご請求いただいた場合に遅滞なく開示いたします' },
  { label: '電話番号', value: 'ご請求いただいた場合に遅滞なく開示いたします' },
  { label: 'メールアドレス', value: 'bitsalon@bitspace.jp' },
  { label: '販売価格', value: '各プランページに記載の金額' },
  { label: '商品代金以外の必要料金', value: 'なし' },
  { label: 'お支払い方法', value: 'クレジットカード決済（Stripe）' },
  { label: 'お支払い時期', value: '各プランの契約周期に応じた前払い' },
  { label: 'サービス提供時期', value: '申込み・決済確認後、[TBD]営業日以内にアカウントを発行' },
  { label: '返品・キャンセルについて', value: '[TBD - 要検討]' },
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
                <tr className="tokushoho__row" key={row.label}>
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
