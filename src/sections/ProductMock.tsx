import './ProductMock.css';

/*
 * 管理画面（予約表）のイメージ。実画面のスクリーンショットではなく HTML で組んだモック。
 * ナビ項目・ステータス色・「予約不可」の表記は実アプリ(salon-reserve-mobile)に合わせている。
 *   ナビ : src/admin/app/AdminShell.jsx の NAV_ITEMS
 *   色   : src/admin/features/reservations/reservationConstants.js の STATUS_OPTIONS
 * 実画面はステータス色をブロックの地色にして白文字を載せるが、LPでは文字が小さく
 * コントラストが足りない（白 on #4aaa6e = 2.89:1）ため、淡い地色＋左線＋濃い文字に置き換えている。
 */

type Status = 'visited' | 'confirmed' | 'blocked';

type Slot = {
  /** 0時からの分。09:00 なら 540 */
  start: number;
  end: number;
  menu: string;
  customer?: string;
  status: Status;
  selected?: boolean;
};

/** カレンダーの表示範囲。09:00〜18:00 */
const RANGE_START = 9 * 60;
const RANGE_HOURS = 9;

const days = ['9/14 (月)', '9/15 (火)', '9/16 (水)', '9/17 (木)', '9/18 (金)'];

const schedule: Slot[][] = [
  [
    { start: 540, end: 600, menu: 'カット', customer: '山田 さま', status: 'visited' },
    { start: 660, end: 750, menu: 'カット＋カラー', customer: '佐藤 さま', status: 'visited' },
    { start: 780, end: 810, menu: '予約不可', status: 'blocked' },
    { start: 840, end: 900, menu: 'カラー', customer: '高橋 さま', status: 'visited' },
    { start: 960, end: 1020, menu: 'カット', customer: '伊藤 さま', status: 'visited' },
  ],
  [
    { start: 600, end: 660, menu: 'カラー', customer: '中村 さま', status: 'visited' },
    { start: 780, end: 810, menu: '予約不可', status: 'blocked' },
    { start: 810, end: 870, menu: 'カット', customer: '加藤 さま', status: 'visited' },
    { start: 930, end: 1020, menu: 'カット＋カラー', customer: '吉田 さま', status: 'visited' },
  ],
  [
    {
      start: 570,
      end: 660,
      menu: 'カット＋カラー',
      customer: '鈴木 さま',
      status: 'visited',
      selected: true,
    },
    { start: 720, end: 780, menu: 'カット', customer: '田中 さま', status: 'visited' },
    { start: 780, end: 810, menu: '予約不可', status: 'blocked' },
    { start: 840, end: 930, menu: 'カラー', customer: '渡辺 さま', status: 'visited' },
    { start: 990, end: 1050, menu: 'カット', customer: '小林 さま', status: 'visited' },
  ],
  [
    { start: 600, end: 660, menu: 'カット', customer: '齋藤 さま', status: 'visited' },
    { start: 690, end: 750, menu: 'カラー', customer: '松本 さま', status: 'visited' },
    { start: 780, end: 810, menu: '予約不可', status: 'blocked' },
    { start: 840, end: 960, menu: 'カット＋カラー', customer: '井上 さま', status: 'visited' },
  ],
  [
    { start: 540, end: 600, menu: 'カット', customer: '木村 さま', status: 'confirmed' },
    { start: 660, end: 750, menu: 'カット＋カラー', customer: '藤田 さま', status: 'confirmed' },
    { start: 780, end: 810, menu: '予約不可', status: 'blocked' },
    { start: 900, end: 960, menu: 'カット', customer: '清水 さま', status: 'confirmed' },
    { start: 990, end: 1080, menu: 'カラー', customer: '山本 さま', status: 'confirmed' },
  ],
];

const visits = [
  { date: '2026/7/12', menu: 'カット＋カラー' },
  { date: '2026/5/3', menu: 'カット' },
  { date: '2026/3/20', menu: 'カラー' },
];

function hhmm(minutes: number) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

const icons = {
  calendar: (
    <>
      <rect x="2.2" y="3.2" width="11.6" height="10.6" rx="2" />
      <path d="M2.2 6.8h11.6M5.6 1.6v3M10.4 1.6v3" />
    </>
  ),
  person: (
    <>
      <circle cx="8" cy="5.2" r="2.6" />
      <path d="M2.9 14c0-2.9 2.3-4.7 5.1-4.7s5.1 1.8 5.1 4.7" />
    </>
  ),
  chat: <path d="M13.5 3.2h-11v7.4h3.1v2.6l3.1-2.6h4.8z" />,
  chart: <path d="M3.2 13.2V8M8 13.2V3.4M12.8 13.2v-3.4" />,
  gear: (
    <>
      <circle cx="8" cy="8" r="2.4" />
      <path d="M8 1.6v1.7M8 12.7v1.7M1.6 8h1.7M12.7 8h1.7M3.5 3.5l1.2 1.2M11.3 11.3l1.2 1.2M12.5 3.5l-1.2 1.2M4.7 11.3l-1.2 1.2" />
    </>
  ),
  phone: (
    <path d="M3.9 2.6h2.4l1 2.4-1.5 1.1a8.4 8.4 0 0 0 4.1 4.1l1.1-1.5 2.4 1v2.4c0 .7-.6 1.3-1.3 1.3A10.6 10.6 0 0 1 2.6 3.9c0-.7.6-1.3 1.3-1.3z" />
  ),
  note: (
    <>
      <rect x="3.2" y="2.4" width="9.6" height="11.2" rx="1.6" />
      <path d="M5.6 6h4.8M5.6 8.4h4.8M5.6 10.8h3" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg className="mock__icon" viewBox="0 0 16 16" focusable="false">
      {icons[name]}
    </svg>
  );
}

const navItems: { label: string; icon: keyof typeof icons }[] = [
  { label: '予約表', icon: 'calendar' },
  { label: 'カルテ', icon: 'person' },
  { label: 'メッセージ', icon: 'chat' },
  { label: 'レポート', icon: 'chart' },
];

export default function ProductMock() {
  return (
    <section className="mock">
      <figure className="container mock__figure">
        {/* 中身はダミーデータの装飾なので、読み上げは figcaption に任せる */}
        <div className="mock__frame" aria-hidden="true">
          <aside className="mock__sidebar">
            <p className="mock__brand">bitSalon</p>
            <ul className="mock__nav">
              {navItems.map((item, index) => (
                <li
                  className={`mock__nav-item${index === 0 ? ' mock__nav-item--active' : ''}`}
                  key={item.label}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="mock__nav-item mock__nav-item--bottom">
              <Icon name="gear" />
              設定
            </p>
          </aside>

          <div className="mock__main">
            <div className="mock__toolbar">
              <p className="mock__toolbar-title">予約カレンダー</p>
              <p className="mock__month">
                <span className="mock__chevron">‹</span>
                2026年9月
                <span className="mock__chevron">›</span>
              </p>
              <p className="mock__views">
                <span className="mock__view">日</span>
                <span className="mock__view mock__view--active">週</span>
                <span className="mock__view">月</span>
              </p>
              <p className="mock__add">＋ 予約を追加</p>
            </div>

            <div className="mock__calendar">
              <div className="mock__axis">
                <div className="mock__axis-head" />
                <div className="mock__axis-body">
                  {Array.from({ length: RANGE_HOURS + 1 }, (_, i) => (
                    <span
                      className="mock__axis-label"
                      key={i}
                      style={{ top: `calc(var(--mock-hour) * ${i})` }}
                    >
                      {hhmm(RANGE_START + i * 60)}
                    </span>
                  ))}
                </div>
              </div>

              {days.map((day, index) => (
                <div className="mock__col" key={day}>
                  <div className="mock__col-head">{day}</div>
                  <div className="mock__col-body">
                    {schedule[index].map((slot) => (
                      <div
                        className={[
                          'mock__event',
                          `mock__event--${slot.status}`,
                          slot.selected ? 'mock__event--selected' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        key={`${day}-${slot.start}`}
                        style={{
                          top: `calc(var(--mock-hour) * ${(slot.start - RANGE_START) / 60})`,
                          height: `calc(var(--mock-hour) * ${(slot.end - slot.start) / 60})`,
                        }}
                      >
                        {slot.status === 'blocked' ? (
                          <span className="mock__event-blocked">{slot.menu}</span>
                        ) : (
                          <>
                            <span className="mock__event-time">
                              {hhmm(slot.start)} - {hhmm(slot.end)}
                            </span>
                            <span className="mock__event-menu">{slot.menu}</span>
                            <span className="mock__event-customer">{slot.customer}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="mock__detail">
            <div className="mock__detail-head">
              <p className="mock__detail-title">予約詳細</p>
              <span className="mock__detail-close">×</span>
            </div>

            <div className="mock__detail-card">
              <p className="mock__detail-menu">カット＋カラー</p>
              <p className="mock__detail-date">2026年9月16日（水）</p>
              <p className="mock__detail-time">09:30 - 11:00</p>
            </div>

            <ul className="mock__detail-rows">
              <li className="mock__detail-row">
                <Icon name="person" />
                鈴木 さま
              </li>
              <li className="mock__detail-row">
                <Icon name="phone" />
                090-1234-5678
              </li>
              <li className="mock__detail-row">
                <Icon name="note" />
                カラー（全体）・カット 120分
              </li>
            </ul>

            <p className="mock__detail-label">来店履歴</p>
            <ul className="mock__detail-visits">
              {visits.map((visit) => (
                <li className="mock__detail-visit" key={visit.date}>
                  <span>{visit.date}</span>
                  <span>{visit.menu}</span>
                </li>
              ))}
            </ul>

            <p className="mock__detail-label">施術メモ</p>
            <p className="mock__detail-memo">
              前回よりやや明るめのベージュ系で。毛先のダメージに注意。
            </p>

            <p className="mock__detail-button">編集する</p>
          </aside>
        </div>

        <figcaption className="mock__caption">予約表・カルテ画面のイメージ</figcaption>
      </figure>
    </section>
  );
}
